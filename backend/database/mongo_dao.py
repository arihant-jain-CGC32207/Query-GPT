import urllib
from pymongo import MongoClient
from config import MONGO_DB_URI

class MongoDAO:
    def __init__(self, database_name: str):
        self.database_name = database_name
        self.client = MongoClient(self.prepare_uri())
        self.database = self.client[database_name]

    def prepare_uri(self):
        return MONGO_DB_URI

    def get_databases(self):
        return self.client.list_database_names()

    def get_collections(self):
        return self.database.list_collection_names()

    def get_sample_documents(self, collection_name: str, limit: int = 3):
        collection = self.database[collection_name]
        return list(collection.find().limit(limit))

    def find(self, collection_name: str, filter: dict = {}, limit: int = 10):
        collection = self.database[collection_name]
        return list(collection.find(filter).limit(limit))

    def aggregate(self, collection_name: str, pipeline: list):
        collection = self.database[collection_name]
        return list(collection.aggregate(pipeline))

    def close_connection(self):
        self.client.close()
