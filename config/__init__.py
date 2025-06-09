from dotenv import load_dotenv
import os

# Load the environment variables from the .env file
load_dotenv()

MONGO_DB_URI = os.getenv("MONGO_DB_URI")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")