#!/usr/bin/python3
"""this class defines a poor road object"""
from models.base import Base, baseMod

class poorRoad(baseMod, Base):
    """defines the good road class"""
    __tablename__ = 'poorRoad'


    def __init__(self, *args, **kwargs):
        """creates an instance of this class"""
        super().__init__(self, *args, **kwargs)
