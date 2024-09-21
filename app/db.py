import os
from dotenv import load_dotenv
from pymongo import MongoClient
import certifi

dotenv_path = 'app/.env'
load_dotenv(dotenv_path)


os.environ["PYTHONWARNINGS"] = "ignore:Unverified HTTPS request"

mongo = MongoClient(os.getenv("DB_CONNECTION_STRING"), tlsCAFile=certifi.where())


db = mongo['dev']