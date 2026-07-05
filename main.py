from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

import numpy
import pandas
import matplotlib.pyplot as plt

trainCSV = pandas.read_csv("../game-statistics/PlayerStatistics.csv", nrows=50000, usecols=["win", "numMinutes", "points", "assists", "reboundsTotal", "fieldGoalsAttempted", "fieldGoalsMade"])
#print(trainCSV.head())

predictCSV = pandas.read_csv("../bball-reference-datasets/Data/Player Per Game.csv", usecols=["player", "team", "season", "mp_per_game", "pts_per_game", "ast_per_game", "trb_per_game", "fga_per_game", "fg_per_game"])

predictMatrix = predictCSV.query("team == 'DET'").query("season == 2026").to_numpy()[:,3:]

trainMatrix = trainCSV.dropna().to_numpy()

#print(trainMatrix)

print(trainMatrix[:,0].shape)
print(trainMatrix[:,1:].shape)

clf = RandomForestClassifier(random_state=0)
clf.fit(trainMatrix[:,1:],trainMatrix[:,0])
print(clf.predict(predictMatrix))



'''
clf = RandomForestClassifier(random_state=0)
transformMatrix = StandardScaler().fit(trainMatrix).transform(trainMatrix)
print(transformMatrix)
print(clf.predict(predictMatrix))
transformDF = pandas.DataFrame(transformMatrix, columns=['win','plusMinusPoints'])
print(transformDF)
new_stats = transformDF.loc[:, ['win', 'plusMinusPoints']]
plt.scatter(new_stats.plusMinusPoints, new_stats.win)
plt.show()
'''