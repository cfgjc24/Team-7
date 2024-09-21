from flask import Flask
from . import db

app = Flask(__name__, static_url_path="", static_folder="../build")
