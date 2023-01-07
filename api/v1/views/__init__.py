#!/usr/bin/python3
"""defines a view function for the apis"""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.goodRoad import *
from api.v1.views.poorRoad import *
