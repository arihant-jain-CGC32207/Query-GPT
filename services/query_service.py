import pandas as pd
from database.mongo_dao import MongoDAO
from services.gpt_service import GPTService
from utils.helpers import generate_schema_top_level, generate_schema_nested_level, get_all_keys_nested

class QueryService:
    def __init__(self, db_name: str):
        self.mongo_dao = MongoDAO(db_name)
        self.gpt_service = GPTService()

    def generate_schemas(self, collection_name):
        top_level_schema = generate_schema_top_level(self.mongo_dao, collection_name)
        nested_schema = generate_schema_nested_level(self.mongo_dao, collection_name)
        return top_level_schema, nested_schema

    def query_gpt(self, user_query, collection_name, is_top_level=True):
        top_level_schema, nested_schema = self.generate_schemas(collection_name)
        sample_docs = self.mongo_dao.get_sample_documents(collection_name, limit=3)
        schema = top_level_schema if is_top_level else nested_schema

        prompt = self.gpt_service.build_prompt(user_query, schema, sample_docs)
        gpt_response = self.gpt_service.call_gpt(prompt)
        response_dict = self.gpt_service.parse_response(gpt_response)

        print("Generated Pipeline:", response_dict)
        results = self.mongo_dao.aggregate(collection_name, response_dict['pipeline'])
        return pd.DataFrame(results)
