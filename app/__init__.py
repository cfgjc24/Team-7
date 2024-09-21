import os
from flask import Flask, request, jsonify
from .mongo import save, get, remove, alert, getByCaregiverID
from .db import db
from . import oauth
from .mongo import save
from flask_cors import CORS
# For development.
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

app = Flask(__name__, static_url_path="", static_folder="../build")
app.secret_key = os.urandom(24)
app.register_blueprint(oauth.blueprint)
CORS(app) 

@app.route("/clockIn", methods=['POST'])
def clockIn():
    data = request.get_json()
    print(data)  # Log the incoming data to debug
    
    # Check if all necessary fields are present in the data
    try:
        save(data['caregiverID'], data['state'], data['geodata'], data['client'], data['timestamp'], data['active'], data["alert"])
    except KeyError as e:
        return jsonify({'error': f'Missing key: {str(e)}'}), 400
    
    print("SUCCESS")
    return jsonify({'message': 'Clocked In'})


@app.route("/getActive", methods=['GET'])
def getActive():
    res = get()[0]
    return res

#Call this endpoint with this example /clockOut?caregiverid={id}
@app.route("/clockOut", methods=['PUT'])
def clockOut():
    queryCg = request.args.get('caregiverid')
    remove(queryCg)

    return f'removed {queryCg}'

@app.route("/queryCareGiver", methods=['GET'])
def getCareGiver():
    queryCg = request.args.get('caregiverid')
    return getByCaregiverID(queryCg)

@app.route("/changeAlert", methods=['PUT'])
def changeAlert():
    queryCg = request.args.get('caregiverid')
    alert(queryCg)

    return f'changed alert for {queryCg}'

    




