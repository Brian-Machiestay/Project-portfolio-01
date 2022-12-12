#!/usr/bin/python3
"""this module populates the database with the road json data"""

import sqlalchemy
from sqlalchemy import Column, String, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sys import argv
import json
import uuid

Base = declarative_base()
engine = create_engine('mysql+mysqldb://engineer:\
development@localhost/ghana_roads')

class Road(Base):
    """Defines a road unit"""
    __tablename__ = "Road"
    id = Column(String(60), primary_key=True)
    region = Column(String(128), nullable=False)
    road_num = Column(String(128), nullable=False)
    road_name = Column(String(128), nullable=False)
    link_ref = Column(String(128), nullable=False)
    section_ref = Column(String(128), nullable=False)
    road_begin = Column(String(128), nullable=False)
    road_end = Column(String(128), nullable=False)
    start_point = Column(Numeric, nullable=False)
    distance = Column(Numeric, nullable=False)
    width = Column(Numeric, nullable=False)
    surf_type = Column(String(128), nullable=False)
    condition_score = Column(String(128), nullable=False)
    iri = Column(Numeric)
    condition = Column(String(128), nullable=False)

    def __init__(self, **kwargs):
        """initializes the road class"""
        self.id = uuid.uuid4()
        self.region = kwargs['Region']
        self.road_num = kwargs['Road No.']
        self.road_name = kwargs['RoadName']
        self.link_ref = kwargs['Link Ref.']
        self.section_ref = kwargs['Sect. Ref.']
        self.road_begin = kwargs['From']
        self.road_end = kwargs['To']
        self.start_point = kwargs['Start (km)']
        self.distance = kwargs['Length (km)']
        self.width = kwargs['Wdth (m)']
        self.surf_type = kwargs['Surf. Type']
        self.condition_score = kwargs['Cond.\nScore']
        self.iri = kwargs['IRI']
        self.condition = kwargs['Cond.']

if __name__ == '__main__':
    engine = create_engine('mysql+mysqldb://engineer:\
development@localhost/ghana_roads')
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    with open(argv[1], 'r', encoding='utf8') as f:
        data = json.loads(f.read())
        for info in data:
            print(info)
            session.add(Road(**info))

    session.commit()

    session.close()
