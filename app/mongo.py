from pymongo import MongoClient
from dotenv import load_dotenv
from db import db


sessions = db["sessions"]
caregivers = db["caregivers"]



def save(caregiverID, state, geodata, client, timestamp, active):
    sessions.insert_one({'caregiverID': caregiverID, 'state': state, 'geodata': geodata, 'client': client, 'timestamp': timestamp, "active": active})

def get():
    res = []
    for session in sessions.find():
        if session.get('active', ""):
            res.append(session)
            
            caregiverDict = caregivers.find_one({'caregiverID': session['caregiverID']})
            if caregiverDict:
                res[-1] = res[-1] | caregiverDict
            else:
                print(f"Caregiver not found {session['caregiverID']}")
            
    return res

def getByCaregiverID(caregiverID):
    res = [sessions.find_one({'caregiverID': caregiverID})]
    if not res:
        return {"error": "Caregiver not found"}
    if not res.get('active', False):
        return {"error": "Caregiver not active"}
    
    caregiverDict = caregivers.find_one({'caregiverID': caregiverID})
    if caregiverDict:
        res[0] = res[0] | caregiverDict
    return res 
    
    
#doesnt actually remove. just inactivates a certain field
def remove(caregiverID):
    result = sessions.update_one({'caregiverID': caregiverID}, {'$set': {'active': False}})




    

