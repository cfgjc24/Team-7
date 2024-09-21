import os
from flask import Flask, request, jsonify, session
from .mongo import save, get, remove, alert, getByCaregiverID
from .db import db
from . import oauth
from .mongo import save

# For development.
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

app = Flask(__name__, static_url_path="", static_folder="../build")
app.secret_key = os.urandom(24)
app.register_blueprint(oauth.blueprint)

@app.route("/clockIn", methods=['POST'])
@oauth.needs_login
def clockIn():
    data = request.get_json()
    careGiverID = session['email']
    save(careGiverID, data['state'], data['geodata'], data['client'], data['timestamp'], data['active'], data["alert"])
    return jsonify({'message': 'Clocked In'})


@app.route("/getActive", methods=['GET'])
@oauth.needs_login
def getActive():
    res = get()[0]
    return res

#Call this endpoint with this example /clockOut?caregiverid={id}
@app.route("/clockOut", methods=['PUT'])
@oauth.needs_login
def clockOut():
    careGiverID = session['email']
    queryCg = careGiverID
    remove(queryCg)

    return f'removed {queryCg}'

@app.route("/queryCareGiver", methods=['GET'])
@oauth.needs_login
def getCareGiver():
    careGiverID = session['email']
    queryCg = careGiverID
    return getByCaregiverID(queryCg)

@app.route("/changeAlert", methods=['PUT'])
@oauth.needs_login
def changeAlert():
    careGiverID = session['email']
    queryCg = careGiverID
    alert(queryCg)

    return f'changed alert for {queryCg}'

@app.route("/bruh", methods=['GET'])
@oauth.needs_login
def bruh():
    from flask import session
    print(session['email'])
    return 'bruh'

    




