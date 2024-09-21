import os
from dotenv import load_dotenv
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import google.auth.transport.requests
from flask import session, redirect, request, Blueprint, abort
from pip._vendor import cachecontrol
from app import app
import requests

load_dotenv()
GOOGLE_CLIENT_ID = "889922476870-nsci7bs2nil5s7s75g0fb9fen5mfn5o3.apps.googleusercontent.com"

oauth = Flow.from_client_config(
    {
      "web": {
        "client_id": "889922476870-nsci7bs2nil5s7s75g0fb9fen5mfn5o3.apps.googleusercontent.com",
        "project_id": "jpmc-code-for-good",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "",
        "redirect_uris": [
          "http://localhost:5000/callback"
        ]
      },
    },
    redirect_uri="http://localhost:5000/callback",
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"])

blueprint = Blueprint("home", __name__)

# decorator
def needs_login(func):
    def decorator(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)
        else:
            return func()
    return decorator

@blueprint.route("/login")
def login():
    authorization_url, state = oauth.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@blueprint.route("/callback")
def callback():
    try:
      oauth.fetch_token(authorization_response=request.url)

      credentials = oauth.credentials
      request_session = requests.session()
      cached_session = cachecontrol.CacheControl(request_session)
      token_request = google.auth.transport.requests.Request(session=cached_session)

      id_info = id_token.verify_oauth2_token(
          id_token=credentials._id_token,
          request=token_request,
          audience=GOOGLE_CLIENT_ID
      )

      session["google_id"] = id_info.get("sub")
      session["email"] = id_info.get("email")
    except Exception:
        return False
    
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")