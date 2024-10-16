from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database.database import db
from models.model import User, Influencer, Sponsor
import jwt
import datetime
import os
from dotenv import load_dotenv
load_dotenv()

auth = Blueprint('auth', __name__)

SECRET_KEY = "your_secret_key"

def generate_token(user):
    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.json

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not all([username, email, password, role]):
        return jsonify({'error': 'All fields are required'}), 400
    
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'error': 'User already exists'}), 400
    
    hashed_password = generate_password_hash(password, method="pbkdf2:sha256")
    new_user = User(username=username, email=email, password=hashed_password, is_influencer=(role == 'influencer'), is_sponsor=(role == 'sponsor'))
    db.session.add(new_user)
    db.session.commit()

    if role == 'influencer':
        influencer = Influencer(user_id=new_user.id, bio='', followers_count=0, social_media_handle='')
        db.session.add(influencer)
    elif role == 'sponsor':
        sponsor = Sponsor(user_id=new_user.id, company_name='', company_description='')
        db.session.add(sponsor)
    
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'All fields are required'}), 400
    
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    token = generate_token(user)

    return jsonify({'message': 'Login successful', 'token': token})

@auth.route('/profile', methods=['GET'])
def profile():
    auth_header = request.headers.get('Authorization')

    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token is missing or invalid format'}), 403

    token = auth_header.split()[1]

    data = decode_token(token)
    if not data:
        return jsonify({'message': 'Invalid or expired token'}), 403

    user = User.query.get(data['id'])
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Profile details for influencers or sponsors
    if user.is_influencer:
        influencer = Influencer.query.filter_by(user_id=user.id).first()
        return jsonify({'username': user.username, 'email': user.email, 'bio': influencer.bio})
    elif user.is_sponsor:
        sponsor = Sponsor.query.filter_by(user_id=user.id).first()
        return jsonify({'username': user.username, 'email': user.email, 'company_name': sponsor.company_name})

    return jsonify({'message': 'Invalid user type'}), 400
