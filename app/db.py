import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

CONNECTION_STRING = os.getenv("DB_CONNECTION_STRING")
client = MongoClient(CONNECTION_STRING)
db = client.get_database("dev")