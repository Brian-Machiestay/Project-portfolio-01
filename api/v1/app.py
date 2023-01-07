#!/usr/bin/python3
"""create a blueprint for the api"""
from flask import Flask, make_response, jsonify
from models import storage
from api.v1.views import app_views
from flask_cors import CORS

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
cors = CORS(app, resources={r"api/v1/*": {"origins": "*"}})


@app.teardown_appcontext
def db_close(error):
    """return session to pool"""
    storage.close()
