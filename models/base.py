#!/bin/env python3
""" the basemodel where all other models inherit from"""
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class BaseMod():
    """ the base class for all classes"""
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
        """initializes a basemodel class"""
        if kwargs:
            for key, val in kwargs.items:
                self.setattr(key, val)
