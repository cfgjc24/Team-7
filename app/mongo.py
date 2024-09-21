from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi


dotenv_path = 'app/.env'
load_dotenv(dotenv_path)


os.environ["PYTHONWARNINGS"] = "ignore:Unverified HTTPS request"

mongo = MongoClient(os.getenv("MONGODB"), tlsCAFile=certifi.where())



db = mongo['dev']
sessions = db["sessions"]



def save(caregiverID, state, geodata, client, timestamp, active):
    sessions.insert_one({'caregiverID': caregiverID, 'state': state, 'geodata': geodata, 'client': client, 'timestamp': timestamp, "active": active})

def get():
    res = []
    for session in sessions.find():
        if session.get('active', ""):
            res.append(session)
    return res

#doesnt actually remove. just inactivates a certain field
def remove(caregiverID):
    result = sessions.update_one({'caregiverID': caregiverID}, {'$set': {'active': False}})
    

