from pymongo import MongoClient
from dotenv import load_dotenv
from app.db import db


sessions = db["sessions"]
caregivers = db["caregivers"]


#if the caregiverID is already in the database, update the entry. Otherwise, insert a new entry
def save(caregiverID, state, geodata, client, timestamp, active, alert):
    for session in sessions.find():
        if session.get('caregiverID', "") == caregiverID:
            sessions.update_one({'caregiverID': caregiverID, 'state': state, 'geodata': geodata, 'client': client, 'timestamp': timestamp, "active": active, "alert": alert})
            return
    sessions.insert_one({'caregiverID': caregiverID, 'state': state, 'geodata': geodata, 'client': client, 'timestamp': timestamp, "active": active, "alert": alert})

#returns all active users and all active users that have been alerted
def get():
    activeUsers = []
    alertedUsers = []
    for session in sessions.find():
        if session.get('active', ""):
            activeUsers.append(session)
            
            caregiverDict = caregivers.find_one({'caregiverID': session['caregiverID']})
            if caregiverDict:
                activeUsers[-1] = activeUsers[-1] | caregiverDict
            else:
                print(f"Caregiver not found {session['caregiverID']}")
            
            del activeUsers[-1]["_id"]
            if session.get('alert', False):
                alertedUsers.append(activeUsers[-1])

            
            
    return activeUsers, alertedUsers


#find the entry for the cargiverID if they are active
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

#Toggle the alert field for the caregiverID
def alert(caregiverID):
    session = sessions.find_one({'caregiverID': caregiverID})
    if session and session.get('active', False):
        alert_value = not session.get('alert', False)
        sessions.update_one({'caregiverID': caregiverID}, {'$set': {'alert': alert_value}})
        return {"success": "Alert toggled successfully"}
    else:
        return {"error": "Caregiver not found"}







    
