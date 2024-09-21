from flask import Flask, request, jsonify
from .mongo import save

app = Flask(__name__, static_url_path="", static_folder="../build")

@app.route("/clockIn", methods=['POST'])
def clockIn():
    data = request.get_json()
    save(data['caregiverID'], data['state'], data['geodata'], data['client'], data['timestamp'], data['active'])
    return jsonify({'message': 'Clocked In'})
