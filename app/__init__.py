import os
from flask import Flask, request, jsonify
from .mongo import save, get, remove
from . import db
from . import oauth
from .mongo import save
# For development.
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'


app = Flask(__name__, static_url_path="", static_folder="../build")
app.secret_key = os.urandom(24)
app.register_blueprint(oauth.blueprint)

@app.route("/clockIn", methods=['POST'])
def clockIn():
    data = request.get_json()
    save(data['caregiverID'], data['state'], data['geodata'], data['client'], data['timestamp'], data['active'])
    return jsonify({'message': 'Clocked In'})


@app.route("/getActive", methods=['GET'])
def getActive():
    res = get()[0]
    return res

@app.route("/clockOut?", methods=['Put'])
def clockOut():
    remove()
