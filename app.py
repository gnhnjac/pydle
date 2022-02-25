from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import sys
from io import StringIO
import json
from flask_jsglue import JSGlue

app = Flask(__name__)
jsglue = JSGlue(app)

def get_daily_result():
    return 10
@app.route('/')
def hello():
    return render_template('index.html')

def get_daily_check(day):
    with open("database.txt","r") as f:
        lines = f.readlines()
        return lines[day-1]

@app.route('/testcase/<question>', methods=['GET'])
def check(question):
    return get_daily_check(int(question))

if __name__ == "__main__":
    app.run(debug=True)