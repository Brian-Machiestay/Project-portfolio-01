#!/usr/bin/python3
"""define the route for the project page"""

from flask import Flask, abort
from flask import render_template

app = Flask(__name__)

@app.route('/', strict_slashes=False)
def root():
    """returns the landing page"""
    return(render_template('index.html'))


@app.route('/ghanaRoads/<chart>', strict_slashes=False)
def for_ghana_roads(chart):
    """returns the project page depending on which chart is specified"""
    charts = ['barChart', 'pieChart']
    if chart not in charts:
        abort(404)
    return (render_template('ghana_roads.html', chart=chart))


if __name__ == "__main__":
    app.run(host='0.0.0.0')
