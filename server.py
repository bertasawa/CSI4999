from flask import Flask, Response, request, current_app, abort
import pandas
app = Flask(__name__)

@app.route('/')
def hello_world():
	return("hello world")

@app.route('/player/')
def player():
	name = request.args.get('name') #1630595
	statsCSV = pandas.read_csv("../bball-reference-datasets/Data/Player Per Game.csv", usecols=["player", "team", "pts_per_game"])
	print(f"{name}")
	print(statsCSV.query("player == @name"))

	return Response(statsCSV.query("player == @name").to_json(), mimetype='text/json')

if __name__ == '__main__':
    app.run(port=1234, threaded=True)