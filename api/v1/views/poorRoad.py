#!/usr/bin/python3
"""defines a view function for poor roads"""
from flask import jsonify
from api.v1.views import app_views
from models.poorRoad import poorRoad
from models import storage
import sqlalchemy


@app_views.route('/allPoorRoads')
def all_poor_roads():
    """returns a all poor roads data"""
    objs = []
    poor_roads_objs = storage.all(poorRoad)
    for ob in poor_roads_objs:
        objs.append(ob.to_dict())
    return(jsonify(objs))
