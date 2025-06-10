CashDash - Your Personal Budgeting Assistant
CashDash is a full-stack web application designed to help you take control of your finances. It offers manual expense tracking, CSV imports, intelligent budget insights powered by AI, and gamified savings goals. You can use it online, syncing your data securely, or in a private offline mode.

Table of Contents
Project Roadmap

Features

Tech Stack

Project Structure

Setup and Installation

Prerequisites

Backend Setup

Frontend Setup

Environment Variables

Usage

Project Roadmap
Phase 1: Project Setup: Initialize directory structure, Supabase project, Flask backend, and basic HTML/CSS/JS files.

Phase 2: Frontend - Static Pages & Auth: Build the landing page and dashboard UI. Integrate Supabase for user signup, login, and logout.

Phase 3: Frontend - Functional Features: Implement expense input, CSV upload, data visualization with Chart.js, and display of AI-generated tips.

Phase 4: Backend - Python Flask API: Develop API endpoints for CRUD operations, CSV processing, AI integration with OpenRouter, and spending forecasts.

Phase 5: Full Integration & Testing: Connect frontend to backend APIs, test the local vs. cloud data sync, and finalize the application.

Features
Secure User Authentication: Signup, login, and session management powered by Supabase Auth.

Manual & Bulk Expense Entry: Add expenses one by one or upload a CSV file from your bank.

Data Visualization: Interactive charts from Chart.js to visualize spending habits.

AI-Powered Insights: Get personalized budget tips and automatic expense categorization from the OpenRouter AI API.

Spending Forecasts: Predict future expenses based on historical data using a Python ML model.

Privacy Control: Choose to keep your data local (browser storage) or sync it securely with the cloud.

Gamified Savings: Earn badges and set budget goals to stay motivated.

Real-time Alerts: Get notified when you're approaching budget limits.

Tech Stack
Frontend: HTML5, CSS3, Tailwind CSS, Vanilla JavaScript, Chart.js

Backend: Python, Flask

Database: Supabase (PostgreSQL)

Authentication: Supabase Auth

AI Services: OpenRouter AI API

Deployment: Can be deployed on services like Vercel, Netlify (frontend), and Heroku, Replit, or Render (backend).

Project Structure
CashDash/
├── backend/
│   ├── app.py             # Main Flask application
│   ├── requirements.txt   # Python dependencies
│   ├── .env               # For secrets (API keys)
│   └── utils/
│       ├── __init__.py
│       ├── csv_utils.py   # CSV parsing functions
│       ├── ai_utils.py    # OpenRouter AI integration
│       └── forecast_utils.py # Forecasting functions
├── frontend/
│   ├── index.html         # Landing Page
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── auth.js        # Supabase auth logic
│       ├── dashboard.js   # Dashboard functionality
│       └── lib/
│           └── chart.min.js # Chart.js library
└── README.md

Setup and Installation
Prerequisites
Python 3.8+ and pip

A Supabase account (free tier)

An OpenRouter AI account to get an API key.

Backend Setup
Navigate to the backend directory:

cd backend

Create a virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

Install dependencies:

pip install -r requirements.txt

Create and populate the .env file (see Environment Variables).

Run the Flask server:

flask run

The backend will be running at http://127.0.0.1:5000.

Frontend Setup
The frontend is composed of static files. You can open them directly in your browser for initial development, but for API integration, they will be served by the Flask backend.

Environment Variables
Create a .env file in the backend/ directory to store your secret keys. Do not commit this file to version control.

# .env

# Supabase Credentials
# Get these from your Supabase project settings > API
SUPABASE_URL="YOUR_SUPABASE_URL"
SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"

# OpenRouter AI API Key
# Get this from your OpenRouter account
OPENROUTER_API_KEY="YOUR_OPENROUTER_API_KEY"

# Flask Secret Key (for session management)
# Generate a random string for this
FLASK_SECRET_KEY="YOUR_SUPER_SECRET_FLASK_KEY"

Usage
Start the backend server.

Navigate to the root URL (e.g., http://127.0.0.1:5000/) in your web browser.

Sign up for a new account or log in.

Start adding expenses on the dashboard.

Explore your spending trends and enjoy the AI-powered financial advice!