import ast
from openai import OpenAI
from config import OPENAI_API_KEY

class GPTService:
    def __init__(self):
        self.client = OpenAI(api_key=OPENAI_API_KEY)

    def build_prompt(self, user_query, schema, documents_list):
        prompt = f"User Query: {user_query}\n\n"
        prompt += f"MongoDB collection schema : {schema}\n"
        prompt += f"examples of docs are : {documents_list}\n"
        prompt += "\nGenerate a MongoDB query based on the user query"
        return prompt

    def call_gpt(self, prompt):
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a MongoDB query developer. Your task is to return "
                        "only a dictionary in the following format: "
                        "{'pipeline': <mongodb_aggregation_pipeline>}."
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
        return ast.literal_eval(response_text)
