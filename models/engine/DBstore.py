#!/usr/bin/python3
"""
Defines the dababase storage engine
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from models.base import Base
from models.goodRoad import goodRoad
from models.poorRoad import poorRoad
from models.fairRoad import fairRoad
from models.noCondRoad import noCondRoad
import sqlalchemy


class DBstore:
    """ the database storage class"""
    __engine = None
    __session = None

    def __init__(self):
        """instantiates this storage engine"""
        self.__engine = create_engine('mysql+mysqldb://engineer:development@localhost/ghana_roads')


    def reload(self):
        """rejuvenates a session for transactions"""
        Base.metadata.create_all(self.__engine)
        sessObj = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sessObj)
        self.__session = Session

    def new(self, obj):
        """"adds an obj to the session"""
        self.__session.add(obj)

    def save(self):
        """commit all new objs and changes to the database"""
        self.__session.commit()

    def close(self):
        """closes the current session"""
        self.__session.remove()


    def all(self, cls):
        """returns all data of a specific class"""
        allObj = self.__session.query(cls).all()
        return(allObj)

    def allcount(self, region):
        """returns the number of objects from all classes
        whose region is the provided region
        """
        count = 0
        classes = [noCondRoad, goodRoad, poorRoad, fairRoad]
        for tab in classes:
            count += self.__session.query(tab).\
                filter(tab.region == region).count()
        return count
