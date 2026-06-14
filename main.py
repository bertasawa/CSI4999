from sklearn.ensemble import RandomForestClassifier
import pandas

statsCSV = pandas.read_csv("../game-statistics/PlayerStatistics.csv", index_col="personId", nrows=120, usecols=["personId", "win", "plusMinusPoints"])
print(statsCSV)

statsMatrix = statsCSV.to_numpy()
trainMatrix = statsMatrix[31:120]
predictMatrix = statsMatrix[:30]
clf = RandomForestClassifier(random_state=0)

X = [[ 1,  2,  3],  # 2 samples, 3 features

     [11, 12, 13]]

y = [0, 1]  # classes of each sample

print(clf.fit(trainMatrix, y))
print(clf.predict(trainMatrix))  # predict classes of the training data
print(clf.predict(predictMatrix))  # predict classes of new data