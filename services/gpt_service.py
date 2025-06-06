import ast
import re 
from openai import OpenAI
from config import OPENAI_API_KEY

class GPTService:
    def __init__(self):
        self.client = OpenAI(api_key=OPENAI_API_KEY)

    def build_prompt(self, user_query, schema, documents_list):
        prompt = f"User Query: {user_query}\n\n"
        prompt += f"MongoDB collection schema : {schema}\n"
        prompt += "\nGenerate a MongoDB query based on the user query"
        return prompt
    
    def call_gpt(self, prompt):
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a MongoDB query generator. "
                        "Return only the Python dictionary without any extra characters, "
                        "code formatting, or markdown. For example, the response should be like this:"
                        "\n\n"
                        "{'pipeline': [{'match': {'status': 'active'}}]}"
                        "\n\n"
                        "Do not add any other explanation, comments, or formatting. Just the dictionary."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2
        )
        return response.choices[0].message.content

    def parse_response(self, response_text):
        try:
            # Parse the cleaned response as a Python literal (dictionary in this case)
            return ast.literal_eval(response_text)
        except Exception as e:
            raise ValueError(f"Error parsing response: {e}")
        return ast.literal_eval(response_text)
