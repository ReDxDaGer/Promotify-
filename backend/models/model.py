from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from database.database import db


class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(128), nullable=False)  # Added password field
    is_influencer = Column(Boolean, default=False)
    is_sponsor = Column(Boolean, default=False)

    influencer = relationship('Influencer', back_populates='user', uselist=False)
    sponsor = relationship('Sponsor', back_populates='user', uselist=False)


class Influencer(db.Model):
    __tablename__ = 'influencers'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True, nullable=False)
    user = relationship('User', back_populates='influencer')

    bio = Column(Text, nullable=False)  # Required field
    followers_count = Column(Integer, default=0, nullable=False)  # Default to 0
    social_media_handle = Column(String(100), nullable=False)  # Required field


class Sponsor(db.Model):
    __tablename__ = 'sponsors'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True, nullable=False)
    user = relationship('User', back_populates='sponsor')

    company_name = Column(String(200), nullable=False)  # Required field
    contact_info = Column(String(200), nullable=False)  # Required field
