from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi


dotenv_path = 'app/.env'
load_dotenv(dotenv_path)


os.environ["PYTHONWARNINGS"] = "ignore:Unverified HTTPS request"


print(os.getenv("MONGODB"))
mongo = MongoClient(os.getenv("MONGODB"), tlsCAFile=certifi.where())



db = mongo['dev']
sessions = db["sessions"]



def save(caregiverID, state, geodata, client, timestamp, active):
    sessions.insert_one({'caregiverID': caregiverID, 'state': state, 'geodata': geodata, 'client': client, 'timestamp': timestamp})

def get():
    for session in sessions.find():
        if session.get('state', "") == 'active':
            return session
