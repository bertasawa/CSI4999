from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.ensemble import StackingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import ConfusionMatrixDisplay

import pickle
import numpy
import pandas
import matplotlib.pyplot as plt

def confusion():
	trainCSV = pandas.read_csv("../game-statistics/PlayerStatistics.csv", nrows=50000, usecols=["win", "numMinutes", "points", "assists", "reboundsTotal", "fieldGoalsAttempted", "fieldGoalsMade"])

	trainMatrix = trainCSV.dropna().to_numpy()

	X_train, X_test, Y_train, Y_test = train_test_split(trainMatrix[:,1:], trainMatrix[:,0], random_state=0)

	with open('weights.pkl', 'rb') as file:
		clf = pickle.load(file)

	disp = ConfusionMatrixDisplay.from_estimator(
		clf,
		X_test,
		Y_test,
		display_labels=clf.classes_,
		cmap = plt.cm.Blues,
		normalize='true',
	)
	disp.ax_.set_title("Confusion Matrix")
	plt.show()
if __name__ == '__main__':
	confusion()