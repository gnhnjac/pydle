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


@app.route('/testcase/<question>', methods=['GET'])
def check(question):
    print(question)
    return "(coding_problem_01([1, 2, 3, 4, 5])==[1, 5, 2, 4, 3])"

if __name__ == "__main__":
    app.run(debug=True)
