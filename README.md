# 🍳 Recipe Generator Agent

A modern, interactive web application powered by OpenAI GPT models for generating creative and delicious recipes. Features a beautiful UI with customizable AI parameters.

## ✨ Features

- **🤖 Multiple GPT Models**: Choose from GPT-4o Mini, GPT-4o, GPT-4, or GPT-3.5 Turbo
- **🎨 Adjustable Creativity**: Control temperature (0.0-1.0) for recipe creativity
- **🌍 Cuisine Selection**: Generate recipes for specific cuisines (Italian, Mexican, Chinese, etc.)
- **🎯 Ingredient-Based**: Input your available ingredients for personalized recipes
- **💻 Modern Web UI**: Clean, responsive interface with real-time feedback
- **🔒 Secure**: Environment variables properly configured and gitignored

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/garghar03/recipe-generator-agent.git
cd recipe-generator-agent
```

### 2. Setup Virtual Environment
```bash
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure API Keys
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from: https://platform.openai.com/api-keys

### 5. Run the Application
```bash
uvicorn app:app --reload
```

Open your browser to `http://127.0.0.1:8000`

## 📝 How It Works

1. **Input Ingredients**: Enter comma-separated ingredients you have available
2. **Choose Cuisine**: Select a cuisine type or leave as "Any"
3. **Select AI Model**: Pick your preferred GPT model based on speed vs. capability
4. **Adjust Creativity**: Use the temperature slider (0.0 = focused, 1.0 = creative)
5. **Generate Recipe**: Click the button to get a complete recipe with instructions!

## 🔧 Configuration Options

### GPT Models
- **GPT-4o Mini**: Fastest, most cost-effective (recommended for most users)
- **GPT-4o**: Balanced performance and capability
- **GPT-4**: Most advanced reasoning and creativity
- **GPT-3.5 Turbo**: Quick responses for simple recipes

### Temperature Settings
- **0.0-0.3**: Focused, consistent recipes
- **0.4-0.7**: Balanced creativity (recommended)
- **0.8-1.0**: Highly creative, varied results

## 🏗️ Project Structure

```
recipe-generator-agent/
├── app.py                 # FastAPI backend with OpenAI integration
├── templates/
│   └── index.html         # Main web interface
├── static/
│   ├── css/
│   │   └── style.css      # UI styling
│   └── js/
│       └── script.js      # Frontend JavaScript
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 📦 Dependencies

- **fastapi**: Modern web framework for Python
- **uvicorn**: ASGI server for FastAPI
- **openai**: Official OpenAI Python client
- **pydantic**: Data validation
- **python-dotenv**: Environment variable management
- **jinja2**: Template engine for HTML rendering

## 🔒 Security

- API keys are stored in `.env` files (never committed to git)
- Virtual environments are gitignored
- No sensitive data is exposed in the repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using FastAPI, OpenAI GPT, and modern web technologies**