// Update temperature value display
document.getElementById('temperature').addEventListener('input', (e) => {
    document.getElementById('tempValue').textContent = e.target.value;
});

document.getElementById('recipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const ingredients = document.getElementById('ingredients').value;
    const cuisine = document.getElementById('cuisine').value;
    const model = document.getElementById('model').value;
    const temperature = parseFloat(document.getElementById('temperature').value);
    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');
    
    // Show loading
    generateBtn.innerHTML = 'Generating...<div class="loading"></div>';
    generateBtn.disabled = true;
    resultDiv.style.display = 'none';
    
    try {
        const response = await fetch('/generate-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients, cuisine, model, temperature }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate recipe');
        }
        
        const data = await response.json();
        resultDiv.textContent = data.recipe;
        resultDiv.style.display = 'block';
    } catch (error) {
        resultDiv.textContent = 'Error: ' + error.message;
        resultDiv.style.display = 'block';
    } finally {
        generateBtn.innerHTML = 'Generate Recipe';
        generateBtn.disabled = false;
    }
});