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


@app.route('/check', methods=['POST'])
def check():
    data = request.get_json()

    return jsonify({'correct':data['guess'] == get_daily_result()})


if __name__ == "__main__":
    app.run(debug=True)
