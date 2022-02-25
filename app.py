from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import sys
from io import StringIO
import json
from flask_jsglue import JSGlue

app = Flask(__name__)
jsglue = JSGlue(app)


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/check', methods=['POST'])
def check():
    data = request.get_json()


    # create file-like string to capture output
    code = StringIO()

    # capture output and errors
    sys.stdout = code

    exception = False
    try:
        exec(data['code'])
        result = code.getvalue()
    except Exception as e:
        exception = True
        result = str(e)

    # restore stdout and stderr
    sys.stdout = sys.__stdout__
    code.close()

    if exception:
        return jsonify({'data':result})

    return jsonify({'data':result})


if __name__ == "__main__":
    app.run(debug=True)
