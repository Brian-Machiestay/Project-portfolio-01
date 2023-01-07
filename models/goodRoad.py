#!/usr/bin/python3
"""this class defines a good road object"""
from models.base import Base, baseMod
import sqlalchemy
from sqlalchemy import Column, String


class goodRoad(baseMod, Base):
    """defines the good road class"""
    __tablename__ = "goodRoad"


    def __init__(self, *args, **kwargs):
        """creates an instance of this class"""
        super().__init__(self, *args, **kwargs)
