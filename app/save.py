from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi


dotenv_path = '.env'
load_dotenv(dotenv_path)


os.environ["PYTHONWARNINGS"] = "ignore:Unverified HTTPS request"

mongo = MongoClient(os.getenv("MONGODB"), tlsCAFile=certifi.where())
db = mongo['lodestar']
sessions = db["sessions"]

print(sessions)