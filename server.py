from flask import Flask, Response, request, current_app, abort
import pandas
import json
import main

app = Flask(__name__)

@app.route('/')
def hello_world():
	return("hello world")

@app.route('/player/')
def player():
	name = request.args.get('name') #1630595
	statsCSV = pandas.read_csv("../bball-reference-datasets/Data/Player Per Game.csv", usecols=["player", "team", "pts_per_game", "trb_per_game", "ast_per_game"])
	print(f"{name}")
	print(statsCSV.query("player == @name"))

	return Response(statsCSV.query("player == @name").head(1).to_json(), mimetype='text/json')

@app.route('/team/')
def team():
	name = request.args.get('name')
	teamCSV = pandas.read_csv("../bball-reference-datasets/Data/Player Per Game.csv", usecols=["player", "team", "season"])
	res = teamCSV.query("team == @name").query("season == 2026")
	print(res)
	return Response(res.to_json(), mimetype='text/json')

@app.route('/predict/')
def predict():
	name1 = request.args.get('name1')
	name2 = request.args.get('name2')
	predict1 = main.predictTeam(name1)
	predict2 = main.predictTeam(name2)
	score = predict1 - predict2
	winner = ''
	if score > 0:
		winner = name1
	elif score < 0:
		winner = name2
	else:
		winner = "Tie"
	scorePercent = 1-((1-(abs(score)))/2)
	res = [winner, scorePercent]
	print(predict1)
	print(predict2)
	print(score)
	print(scorePercent)
	return(res)


if __name__ == '__main__':
    app.run(port=1234, threaded=True)