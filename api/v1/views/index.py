#!/usr/bin/python3
"""defines a stats for all regions in database"""
from flask import jsonify
from api.v1.views import app_views
from models.fairRoad import fairRoad
from models import storage
import sqlalchemy


@app_views.route('/stats')
def stats():
    """returns the stat for all regions"""
    objs = dict()
    regions = ["NOR","EAR","GAR","CER","BAR","ASR","WER","VOR","UER", "UWR"]
    for reg in regions:
        count = storage.allcount(reg)
        objs[reg] = count
    return(jsonify(objs))
