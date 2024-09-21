from pymongo import MongoClient
from dotenv import load_dotenv
from db import db


sessions = db["sessions"]
caregivers = db["caregivers"]


#if the caregiverID is already in the database, update the entry. Otherwise, insert a new entry
def save(caregiverID, state, geodata, client, timestamp, active, alert):
    for session in sessions.find():
        if session.get('caregiverID', "") == caregiverID and session.get('active', False):
            sessions.update_one({'_id': session.get("_id")}, {'$set': {'caregiverID': caregiverID, 'state': state, 'geodata': geodata, 'client': client, 'timestamp': timestamp, "active": active, "alert": alert}})
            return
        
    sessions.insert_one({'caregiverID': caregiverID, 'state': state, 'geodata': geodata, 'client': client, 'timestamp': timestamp, "active": active, "alert": alert})

#returns all active users and all active users that are alerting
def get():
    activeUsers = [] #all active users
    alertedUsers = [] #all active users that are alerting
    for session in sessions.find():
        if session.get('active', ""):
            activeUsers.append(session.copy())
            
            caregiverDict = caregivers.find_one({'caregiverID': session['caregiverID']})
            if caregiverDict:
                activeUsers[-1] = activeUsers[-1] | caregiverDict
            # else:
            #     print(f"Caregiver not found {session['caregiverID']}")
            
            del activeUsers[-1]["_id"]
            if session.get('alert', False):
                alertedUsers.append(activeUsers[-1])

            
            
    return activeUsers, alertedUsers


#find the entry for the cargiverID if they are active
def getByCaregiverID(caregiverID):
    res = [None]
    for session in sessions.find():
        if session.get('caregiverID', "") == caregiverID and session.get('active', False):
            res[0]=session.copy()
            
    if not res[0]:
        return {"error": "Active Caregiver not found"}
    
    caregiverDict = caregivers.find_one({'caregiverID': caregiverID})
    if caregiverDict:
        res[0] = res[0] | caregiverDict
    
    del res[0]["_id"]
    return res 
    
    
#doesnt actually remove. just inactivates a certain field
def remove(caregiverID):
    for session in sessions.find():
        if session.get('caregiverID', "") == caregiverID and session.get('active', False):
            sessions.update_one({'_id': session.get("_id")}, {'$set': {'active': False}})
            return {"status": "Caregiver removed"}
    return {"status": "Caregiver not found"}

#Toggle the alert field for the caregiverID
def alert(caregiverID):
    
    for session in sessions.find():
        if session.get('caregiverID', "") == caregiverID and session.get('active', False):
            alert_value = not session.get('alert', False)
            sessions.update_one({'_id': session.get("_id")}, {'$set': {'alert': alert_value}})
            return {"success": "Alert toggled successfully"}
        else:
            return {"error": "Caregiver not found"}
    






    
