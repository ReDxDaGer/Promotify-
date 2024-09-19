from flask_sqlalchemy import Column, Integer, String , ForeignKey , Text , Boolean 
from sqlalchemy.orm import relationship
from backend.database.database import db

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    is_influencer = Column(Boolean, default=False)
    is_sponsor = Column(Boolean, default=False)

    influencer = relationship('Influencer', back_populates='user', uselist=False)
    sponsor = relationship('Sponsor', back_populates='user', uselist=False)

class Influencer(db.Model):
    __tablename__ = 'influencers'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True, nullable=False)
    user = relationship('User', back_populates='influencer')

    bio = Column(Text, nullable=False)
    followers_count = Column(Integer, nullable=False)
    social_media_handle = Column(String(100), nullable=False)

    user = relationship('User', back_populates='influencer')

class Sponsor(db.Model):
    __tablename__ = 'sponsors'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer , ForeignKey('users.id') , unique=True , nullable=False)
    company_name = Column(String(200), nullable=False)
    contact_info = Column(String(200), nullable=False)

    user = relationship('User', back_populates='sponsor')