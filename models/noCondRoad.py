#!/usr/bin/python3
"""this class defines a road with no condition"""
from models.base import Base, baseMod
import sqlalchemy
from sqlalchemy import Column, String


class noCondRoad(baseMod, Base):
    """defines the good road class"""
    __tablename__ = "noCondRoad"


    def __init__(self, *args, **kwargs):
        """creates an instance of this class"""
        super().__init__(self, *args, **kwargs)
