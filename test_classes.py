#!/usr/bin/python3
"""this module tests the created clases, basemod, fairRoad and poorRoad"""

from models.goodRoad import goodRoad
import json


data = ''
with open('Road-condition.json', "r", encoding='utf8') as f:
    data = json.loads(f.read())

for item in data:
    if item['Cond.'] == "Good":
        dt = dict()
        dt['region'] = item['Region']
        dt['road_num'] = item['Road No.']
        dt['road_name'] = item['RoadName']
        dt['link_ref'] = item['Link Ref.']
        dt['section_ref'] = item['Sect. Ref.']
        dt['road_begin'] = item['From']
        dt['road_end'] = item['To']
        dt['start_point'] = item['Start (km)']
        dt['distance'] = item['Length (km)']
        dt['width'] = item['Wdth (m)']
        dt['surf_type'] = item['Surf. Type']
        dt['condition_score'] = item['Cond.\nScore']
        dt['iri'] = item['IRI']
        dt['condition'] = item['Cond.']
        dt = goodRoad(**dt)
        dt.save()
        print(dt.to_dict())
