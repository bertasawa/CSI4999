from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.ensemble import StackingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

import pickle
import numpy
import pandas
import matplotlib.pyplot as plt

def predictTeam(team):
	with open('weights.pkl', 'rb') as file:
		clf = pickle.load(file)
	predictCSV = pandas.read_csv("../bball-reference-datasets/Data/Player Per Game.csv", usecols=["player", "team", "season", "mp_per_game", "pts_per_game", "ast_per_game", "trb_per_game", "fga_per_game", "fg_per_game"])

	predictMatrix = predictCSV.query(f"team == '{team}'").query("season == 2026").to_numpy()[:,3:]
	predictionArray = clf.predict(predictMatrix)
	res = 0
	for i in predictionArray:
		res += i
	return (res/predictionArray.size)

if __name__ == "__main__":
	predictTeam('DET')