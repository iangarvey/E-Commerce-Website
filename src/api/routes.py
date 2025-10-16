"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cart, CartItem, Product
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

    new_user = User(
        email=data['email'],
        is_active=True
    )
    new_user.set_password(data['password'])

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

    if not user or not check_password_hash(user.password_hash, data['password']):
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

@api.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    cart = Cart.query.filter_by(user_id=current_user_id).first()
    if not cart:
        return jsonify({"cart": []}), 200
    
    cart_items = CartItem.query.filter_by(cart_id=cart.id).all()

    items = [{
        "id": item.id,
        "product_id": item.product_id,
        "quantity": item.quantity,
        "added_at": item.added_at.isoformat()
    } for item in cart_items]

    return jsonify({
        "cart": items
    }), 200



@api.route('/add-to-cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if not data or 'productId' not in data or 'quantity' not in data:
        return jsonify({"error": "Product ID and quantity are required"}), 400

    # Get or create cart for user
    cart = Cart.query.filter_by(user_id=current_user_id).first()
    if not cart:
        cart = Cart(user_id=current_user_id)
        db.session.add(cart)
        db.session.commit()

    # Check if product already in cart
    existing_item = CartItem.query.filter_by(
        cart_id=cart.id, 
        product_id=data['productId']
    ).first()

    if existing_item:
        existing_item.quantity += data['quantity']
    else:
        new_item = CartItem(
            cart_id=cart.id,
            product_id=data['productId'],
            quantity=data['quantity']
        )
        db.session.add(new_item)

    try:
        db.session.commit()
        return jsonify({"message": "Item added to cart successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
