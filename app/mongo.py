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



def save(caregiverID, state, geodata, client, timestamp):
    sessions.insert_one({'caregiverID': caregiverID, 'state': state, 'geodata': geodata, 'client': client, 'timestamp': timestamp})

save("123", "test", "test", "test", "test")