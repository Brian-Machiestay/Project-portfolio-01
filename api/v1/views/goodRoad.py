#!/usr/bin/python3
"""defines a view function for good roads"""

from api.v1.views import app_views
from models.goodRoad import goodRoad
from models import storage
import sqlalchemy


@app_views.route('/allGoodRoads')
def all_good_roads():
    """returns a all good roads data"""
    objs = []
    good_roads_objs = storage.all(goodRoad)
    for ob in good_roads_objs:
        objs.append(ob.to_dict)
    return(objs)
