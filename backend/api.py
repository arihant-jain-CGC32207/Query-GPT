# api.py
from fastapi import FastAPI
from pydantic import BaseModel
from services.query_service import QueryService
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allowing CORS for React frontend (localhost:3000)
# In your Backend/api.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic model to validate the user input (prompt)
class UserPrompt(BaseModel):
    prompt: str

# Function to handle the user prompt and call query_gpt
def process_query(user_prompt: str, db_name: str, collection_name: str):
    query_service = QueryService(db_name)
    df = query_service.query_gpt(user_prompt, collection_name, is_top_level=True)
    return df.to_dict(orient="records")  # Convert DataFrame to list of dictionaries

# FastAPI POST endpoint to handle the user prompt and call the process_query function
@app.post("/process-prompt/")
async def process_prompt(user_prompt: UserPrompt):
    db_name = "cgcl_los_uat"
    collection_name = "leads"
    print("Successful API")
    result = process_query(user_prompt.prompt, db_name, collection_name)
    return {"result": result}
