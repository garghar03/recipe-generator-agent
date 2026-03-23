const { useState } = React;

function formatRecipe(recipeText) {
    return recipeText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');
}

function RecipeApp() {
    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [cuisine, setCuisine] = useState('any');
    const [model, setModel] = useState('gpt-4o-mini');
    const [temperature, setTemperature] = useState(0.7);
    const [recipeHtml, setRecipeHtml] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const hasRecipe = Boolean(recipeHtml);

    const addIngredient = () => {
        const ingredient = ingredientInput.trim().toLowerCase();
        if (!ingredient || ingredients.includes(ingredient)) {
            return;
        }
        setIngredients((previousIngredients) => [...previousIngredients, ingredient]);
        setIngredientInput('');
    };

    const removeIngredient = (ingredientToRemove) => {
        setIngredients((previousIngredients) =>
            previousIngredients.filter((item) => item !== ingredientToRemove)
        );
    };

    const onIngredientKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addIngredient();
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (ingredients.length === 0) {
            setError('Please add at least one ingredient!');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: ingredients.join(', '),
                    cuisine,
                    model,
                    temperature: parseFloat(temperature),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate recipe');
            }

            const data = await response.json();
            setRecipeHtml(formatRecipe(data.recipe));
        } catch (requestError) {
            setRecipeHtml('');
            setError(requestError.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <header className="hero">
                <h1><i className="fas fa-utensils"></i> AI Recipe Generator</h1>
                <p>Create balanced, practical meals from what you already have in your kitchen.</p>
            </header>

            <div className="main-content">
                <form id="recipeForm" className="input-section" onSubmit={onSubmit}>
                    <div className="input-card elevated-card">
                        <div className="section-head">
                            <h2><i className="fas fa-shopping-basket"></i> Ingredients</h2>
                            <span className="section-meta">{ingredients.length} added</span>
                        </div>
                        <p className="section-subtitle">Add ingredients one by one to build your recipe base.</p>
                        <div className="ingredient-input">
                            <input
                                type="text"
                                id="ingredients"
                                value={ingredientInput}
                                onChange={(event) => setIngredientInput(event.target.value)}
                                onKeyDown={onIngredientKeyDown}
                                placeholder="e.g., chicken, rice, broccoli, garlic, soy sauce"
                            />
                            <button type="button" id="addIngredient" className="add-btn" onClick={addIngredient}>
                                <i className="fas fa-plus"></i> Add
                            </button>
                        </div>
                        <div id="ingredientTags" className="ingredient-tags">
                            {ingredients.map((ingredient) => (
                                <div key={ingredient} className="ingredient-tag">
                                    {ingredient}
                                    <span className="remove-tag" onClick={() => removeIngredient(ingredient)}>&times;</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="controls-grid">
                        <div className="control-card">
                            <label className="control-label" htmlFor="cuisine">
                                <i className="fas fa-globe"></i> Cuisine Style
                            </label>
                            <select id="cuisine" value={cuisine} onChange={(event) => setCuisine(event.target.value)}>
                                <option value="any">🌍 Any Cuisine</option>
                                <option value="italian">🇮🇹 Italian</option>
                                <option value="mexican">🇲🇽 Mexican</option>
                                <option value="chinese">🇨🇳 Chinese</option>
                                <option value="indian">🇮🇳 Indian</option>
                                <option value="french">🇫🇷 French</option>
                                <option value="japanese">🇯🇵 Japanese</option>
                                <option value="thai">🇹🇭 Thai</option>
                                <option value="mediterranean">🫒 Mediterranean</option>
                                <option value="american">🇺🇸 American</option>
                            </select>
                        </div>

                        <div className="control-card">
                            <label className="control-label" htmlFor="model">
                                <i className="fas fa-brain"></i> AI Model
                            </label>
                            <select id="model" value={model} onChange={(event) => setModel(event.target.value)}>
                                <option value="gpt-4o-mini">⚡ GPT-4o Mini (Fast)</option>
                                <option value="gpt-4o">🎯 GPT-4o (Balanced)</option>
                                <option value="gpt-4">🧠 GPT-4 (Advanced)</option>
                                <option value="gpt-3.5-turbo">🚀 GPT-3.5 Turbo (Quick)</option>
                            </select>
                        </div>

                        <div className="control-card full-width-card">
                            <div className="slider-head">
                                <label className="control-label" htmlFor="temperature">
                                    <i className="fas fa-magic"></i> Creativity Level
                                </label>
                                <span className="slider-value">{temperature}</span>
                            </div>
                            <div className="temperature-control">
                                <input
                                    type="range"
                                    id="temperature"
                                    min="0.0"
                                    max="1.0"
                                    step="0.1"
                                    value={temperature}
                                    onChange={(event) => setTemperature(event.target.value)}
                                />
                                <div className="temp-labels">
                                    <span>Focused</span>
                                    <span>Creative</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" id="generateBtn" className="generate-btn" disabled={loading}>
                        <i className={loading ? 'fas fa-spinner fa-spin' : 'fas fa-hat-wizard'}></i>
                        {' '}
                        {loading ? 'Generating...' : 'Generate Recipe'}
                    </button>
                </form>

                <div className="output-section">
                    <div id="result" className="recipe-result">
                        {!loading && !error && !hasRecipe && (
                            <div className="empty-state-card">
                                <img src="/static/images/food-hero.svg" alt="Fresh ingredients on a plate" className="empty-state-image" />
                                <h2>Ready to cook something great?</h2>
                                <p>
                                    Add 3-5 ingredients on the left and generate a personalized recipe with steps,
                                    prep guidance, and serving details.
                                </p>
                                <div className="empty-state-tips">
                                    <span><i className="fas fa-lightbulb"></i> Tip: Add one protein + one vegetable + one spice.</span>
                                </div>
                            </div>
                        )}

                        {error && !recipeHtml && (
                            <div className="recipe-card" style={{ borderLeftColor: '#dc3545' }}>
                                <h2 style={{ color: '#dc3545' }}>
                                    <i className="fas fa-exclamation-triangle"></i> Error
                                </h2>
                                <p>{error}</p>
                            </div>
                        )}

                        {!error && recipeHtml && (
                            <div className="recipe-card">
                                <h2><i className="fas fa-utensils"></i> Your AI-Generated Recipe</h2>
                                <div
                                    className="recipe-content"
                                    dangerouslySetInnerHTML={{ __html: recipeHtml }}
                                ></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {loading && (
                <div className="loading-overlay" id="loadingOverlay">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <div className="loading-text">AI is cooking up your recipe...</div>
                    </div>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RecipeApp />);
