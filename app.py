from flask import Flask, render_template
from os import listdir
from os.path import isfile, join
import os
import logging

app = Flask(__name__, static_folder="static")
logger = logging.getLogger('werkzeug')

@app.route('/')
def index_endpoint():
    mypath = './static/pdfs'
    files = [f for f in listdir(mypath) if isfile(join(mypath, f))]

    return render_template("index.html", len = len(files), files = files)

@app.route('/about')
def about():
    return render_template("about.html")

if __name__ == '__main__':
    app.run()
