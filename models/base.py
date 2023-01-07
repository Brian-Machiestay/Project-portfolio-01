#!/bin/env python3
""" the basemodel where all other models inherit from"""
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import String, Numeric, Column
import models
import uuid


Base = declarative_base()

class baseMod():
    """ the base class for all classes"""
    id = Column(String(128), nullable=False, primary_key=True)
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

    def __init__(self,*args, **kwargs):
        """initializes a basemodel class"""
        if kwargs:
            self.id = str(uuid.uuid4())
            for key, val in kwargs.items():
                setattr(self, key, val)
        else:
            print("no attributes provided")
            return


    def to_dict(self):
        """return a dictionary representation of this object"""
        newObj = self.__dict__.copy()
        del(newObj['_sa_instance_state'])
        return newObj

    def save(self):
        """saves obj to the database"""
        models.storage.new(self)
        models.storage.save()

    def close(self):
        """drops the current session"""
        models.storage.close()
