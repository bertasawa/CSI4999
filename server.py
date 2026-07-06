from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import pandas
import main

app = Flask(__name__)

# Allows the React frontend to call the Flask backend
CORS(app)


@app.route("/")
def hello_world():
    return "hello world"


@app.route("/player/")
def player():
    name = request.args.get("name")

    statsCSV = pandas.read_csv(
        "../bball-reference-datasets/Data/Player Per Game.csv",
        usecols=[
            "player",
            "team",
            "pts_per_game",
            "trb_per_game",
            "ast_per_game",
        ],
    )

    print(name)
    print(statsCSV.query("player == @name"))

    return Response(
        statsCSV.query("player == @name").head(1).to_json(),
        mimetype="application/json",
    )


@app.route("/team/")
def team():
    name = request.args.get("name")

    teamCSV = pandas.read_csv(
        "../bball-reference-datasets/Data/Team Summaries.csv",
        usecols=["season", "abbreviation", "w", "l"],
    )

    res = teamCSV.query("abbreviation == @name").query("season == 2026")

    print(res)

    return Response(
        res.to_json(),
        mimetype="application/json",
    )


@app.route("/predict/")
def predict():
    name1 = request.args.get("name1")
    name2 = request.args.get("name2")

    if not name1 or not name2:
        return jsonify({"error": "Two team names are required"}), 400

    predict1 = main.predictTeam(name1)
    predict2 = main.predictTeam(name2)

    score = predict1 - predict2

    if score > 0:
        winner = name1
    elif score < 0:
        winner = name2
    else:
        winner = "Tie"

    scorePercent = 1 - ((1 - abs(score)) / 2)

    print("Team 1 prediction:", predict1)
    print("Team 2 prediction:", predict2)
    print("Score difference:", score)
    print("Winning percentage:", scorePercent)

    return jsonify([winner, scorePercent])


if __name__ == "__main__":
    app.run(port=1234, threaded=True)