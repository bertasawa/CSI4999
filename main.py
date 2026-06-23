from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import pandas

statsCSV = pandas.read_csv("../game-statistics/PlayerStatistics.csv", index_col="personId", nrows=120, usecols=["personId", "win", "plusMinusPoints"])
statsMatrix = statsCSV.to_numpy()
trainMatrix = statsMatrix[31:120]
predictMatrix = statsMatrix[:30]
print(type(trainMatrix))
clf = RandomForestClassifier(random_state=0)

X = [[ 1,  2,  3],  # 2 samples, 3 features

     [11, 12, 13]]

y = [0, 1]  # classes of each sample

print(StandardScaler().fit(trainMatrix))

print(StandardScaler().fit(trainMatrix).transform(trainMatrix))
