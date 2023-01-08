#!/usr/bin/python3
"""this class defines a fair road object"""
from models.base import Base, baseMod

class fairRoad(baseMod, Base):
    """defines the fair road class"""
    __tablename__ = 'fairRoad'


    def __init__(self, *args, **kwargs):
        """creates an instance of this class"""
        super().__init__(self, *args, **kwargs)
