from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

import pandas
import matplotlib.pyplot as plt

statsCSV = pandas.read_csv("../game-statistics/PlayerStatistics.csv", index_col="personId", nrows=120, usecols=["personId", "win", "plusMinusPoints"])
statsMatrix = statsCSV.to_numpy()
print(statsMatrix)
trainMatrix = statsMatrix[31:120]
predictMatrix = statsMatrix[:30]

clf = RandomForestClassifier(random_state=0)
clf.fit(trainMatrix[:,1].reshape(-1,1),trainMatrix[:,0])
print(clf.predict(predictMatrix.reshape(-1,1)))



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