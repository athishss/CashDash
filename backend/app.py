from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "default_secret_key")
CORS(app)

@app.route("/")
def index():
    return "CashDash API is live!"

@app.route("/ping")
def ping():
    return jsonify({"message": "pong"}), 200

if __name__ == "__main__":
    app.run(debug=True)