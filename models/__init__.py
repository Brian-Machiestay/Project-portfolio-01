#!/usr/bin/python3
"""creates an instance of the storage class and reload on import"""
from models.engine.DBstore import DBstore

storage = DBstore()

storage.reload()
