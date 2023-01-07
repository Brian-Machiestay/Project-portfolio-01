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


@app.errorhandler(404)
def notFound(error):
    """custom 404 message if api endpoint does not exist"""
    return(make_response(jsonify({'error': 'Not Found'})), 404)


if "__name__" == "__main__":
    app.run(host='0.0.0.0', threaded=True)
