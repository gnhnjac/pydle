from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import sys
from io import StringIO
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_daily_result():
    return 10
@app.route('/')
def ind():
    return render_template('index.html')

def get_daily_check(day):
    with open("solutions.txt","r") as f:
        lines = f.readlines()
        return lines[day]

def get_daily_challenge(day):
    with open("challenges.txt","r") as f:
        codes = f.read().split("@@@@@@@")
        return codes[day]

@app.route('/testcase/<question>', methods=['GET'])
def get_check(question):
    return get_daily_check(int(question))

@app.route('/getq/<question>', methods=['GET'])
def get_question(question):
    return get_daily_challenge(int(question))

if __name__ == "__main__":
    app.run(debug=True)