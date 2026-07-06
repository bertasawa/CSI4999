from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

import numpy
import pandas
import matplotlib.pyplot as plt

def predictTeam(team):
	trainCSV = pandas.read_csv("../game-statistics/PlayerStatistics.csv", nrows=50000, usecols=["win", "numMinutes", "points", "assists", "reboundsTotal", "fieldGoalsAttempted", "fieldGoalsMade"])

	predictCSV = pandas.read_csv("../bball-reference-datasets/Data/Player Per Game.csv", usecols=["player", "team", "season", "mp_per_game", "pts_per_game", "ast_per_game", "trb_per_game", "fga_per_game", "fg_per_game"])

	predictMatrix = predictCSV.query(f"team == '{team}'").query("season == 2026").to_numpy()[:,3:]

	trainMatrix = trainCSV.dropna().to_numpy()

	clf = RandomForestClassifier(random_state=0)
	clf.fit(trainMatrix[:,1:],trainMatrix[:,0])
	predictionArray = clf.predict(predictMatrix)
	res = 0
	for i in predictionArray:
		res += i
	return (res/predictionArray.size)

if __name__ == "__main__":
	predictTeam('DET')