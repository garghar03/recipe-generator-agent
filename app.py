import os
from dotenv import load_dotenv
from openai import OpenAI
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
from pydantic import BaseModel

# Load environment variables from .env file
load_dotenv()

# Get configuration from environment variables
api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
if api_key:
    client = OpenAI(api_key=api_key)
    print("Using OpenAI")
else:
    raise ValueError(
        "Missing API configuration. Please set OPENAI_API_KEY in your .env file"
    )

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

class RecipeRequest(BaseModel):
    ingredients: str
    cuisine: str = "any"
    model: str = "gpt-4o-mini"
    temperature: float = 0.7

@app.get("/")
def get_ui(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/generate-recipe")
def generate_recipe(request: RecipeRequest):
    try:
        prompt = f"Create a delicious recipe using these ingredients: {request.ingredients}"
        if request.cuisine != "any":
            prompt += f". Make it {request.cuisine} style."
        prompt += "\n\nPlease provide:\n1. Recipe name\n2. Ingredients list with quantities\n3. Step-by-step instructions\n4. Cooking time and servings"
        
        messages = [{"role": "user", "content": prompt}]
        
        completion = client.chat.completions.create(
            model=request.model, 
            messages=messages,
            temperature=request.temperature
        )
        
        return {"recipe": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))