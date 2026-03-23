# Recipe Generator Agent

A simple OpenAI-powered recipe generator that demonstrates API integration with environment variables.

## 🚀 Quick Start

### 1. Setup
```bash
cd recipe-generator-agent
pip install -r requirements.txt
```

### 2. Configure API Keys
```bash
cp .env.example .env
```

Edit `.env` and add your API key:
- **OPENAI_API_KEY** from https://platform.openai.com/api-keys

Or for Azure OpenAI:
- **AZURE_OPENAI_API_KEY**
- **AZURE_OPENAI_ENDPOINT**
- **AZURE_OPENAI_DEPLOYMENT**

### 3. Run
```bash
python app.py
```

## 📝 What it does

- Uses OpenAI GPT-4o-mini to complete the prompt: "Complete the following: Once upon a time there was a"
- Demonstrates proper environment variable configuration
- Supports both OpenAI and Azure OpenAI

## 🔧 Configuration

The app automatically detects which API to use based on your environment variables:

- If `AZURE_OPENAI_*` variables are set → Uses Azure OpenAI
- If `OPENAI_API_KEY` is set → Uses regular OpenAI
- If neither → Shows helpful error message

## 📦 Dependencies

- openai (latest v1.x API)
- python-dotenv