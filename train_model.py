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

def trainModel():
	trainCSV = pandas.read_csv("../game-statistics/PlayerStatistics.csv", nrows=50000, usecols=["win", "numMinutes", "points", "assists", "reboundsTotal", "fieldGoalsAttempted", "fieldGoalsMade"])

	trainMatrix = trainCSV.dropna().to_numpy()

	estimators = [('rf', RandomForestClassifier()), ('svr', make_pipeline(StandardScaler(), LinearSVC(random_state=42)))]

	clf = StackingClassifier(estimators=estimators, final_estimator=LogisticRegression())

	#clf = RandomForestClassifier(random_state=0)
	clf.fit(trainMatrix[:,1:],trainMatrix[:,0])
	with open('weights.pkl', 'wb') as file:
		pickle.dump(clf, file)

if __name__ == '__main__':
	trainModel()