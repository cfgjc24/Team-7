import array
from flask import Flask, request, jsonify
from .mongo import save, get, remove

app = Flask(__name__, static_url_path="", static_folder="../build")

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
