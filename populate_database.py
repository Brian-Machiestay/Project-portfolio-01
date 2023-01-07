#!/usr/bin/python3
"""this module tests the created clases, basemod, fairRoad and poorRoad"""

class databaseNotFoundException(Exception):
    """creates a database does not exist exception"""
    pass


try:
    try:
        from models.goodRoad import goodRoad
        from models.poorRoad import poorRoad
        from models.fairRoad import fairRoad


        import json


        data = ''
        with open('Road-condition.json', "r", encoding='utf8') as f:
            data = json.loads(f.read())

        gcount = 0
        pcount = 0
        fcount = 0
        for item in data:
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

            if dt['condition'] == "Good":
                if gcount == 0:
                    print("populating good roads data...")
                    gcount += 1
                dt = goodRoad(**dt)
            elif dt['condition'] == "Poor":
                if pcount == 0:
                    print("populating poor roads data...")
                    pcount += 1
                dt = poorRoad(**dt)
            elif dt['condition'] == "Fair":
                if fcount == 0:
                    print("populating fair roads data...")
                    fcount += 1
                dt = fairRoad(**dt)
            else:
                continue
            dt.save()
        print("applying final finishes...")
        dt.close()
        print("Done!!!")

    except(Exception):
        raise databaseNotFoundException
except databaseNotFoundException:
    print("...There was an error trying to load the data\n\
...make sure ghana_roads database is created and you have mysql running\n\
...install mysql and run the sql script in this folder with the command\n\
'cat database_setup.sql | sudo mysql'")
