"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager 
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# health check endpoint
@api.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from the API!"}), 200

@api.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()

    # valid input
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Email and password are required"}), 400 
    
    # check to see if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "User already exists"}), 400
    
    # create new user
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        email=data['email'],
        password=hashed_password,
        is_active=True
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e: 
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/login', methods=['POST'])
def create_token():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"error": "invalid credentials"}), 401

    # create token
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "token": access_token,
        "user_id": str(user.id),
        "email": user.email
    }), 200

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():

    return jsonify({"message": "Logged out successfully"}), 200

# private route to check token and see if authorized to view private page
@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "message": "The private page works!",
        "user": {
            "id": str(user.id),
            "email": user.email
        }
    }), 200