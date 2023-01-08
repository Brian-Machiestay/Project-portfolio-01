#!/usr/bin/python3
"""defines a view function for fair roads"""
from flask import jsonify
from api.v1.views import app_views
from models.fairRoad import fairRoad
from models import storage
import sqlalchemy


@app_views.route('/allFairRoads')
def all_fair_roads():
    """returns a all fair roads data"""
    objs = []
    fair_roads_objs = storage.all(fairRoad)
    for ob in fair_roads_objs:
        objs.append(ob.to_dict())
    return(jsonify(objs))
