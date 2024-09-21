import os
from flask import Flask
from . import db

# For development.
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

app = Flask(__name__, static_url_path="", static_folder="../build")
app.secret_key = os.urandom(24)

from . import oauth

app.register_blueprint(oauth.blueprint)

