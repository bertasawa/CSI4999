# season,lg,player,player_id,age,team,pos,g,gs,mp,pg_percent,sg_percent,sf_percent,pf_percent,c_percent,on_court_plus_minus_per_100_poss,net_plus_minus_per_100
# go through the csv file and calculate scores for each player based on the listed stats. calculate new score for new year, then save the average of the existing score with the new one as the player's current score. repeat until present day
# build list of all players with most recent year as listed season. all stats stored are averages of those previous. calculate score based on singular entry, not a bunch of different ones

# import pandas as pd
# df = pd.read_csv('Player Play By Play.csv')
# print(df)

import csv

def predictionScore(player_id):
    playerstats = allplayers[player_id]
    total = 0
    a = 2
    for i in range(2, 9):
        total += int(playerstats[i])
    average = total//7
    return average

def findPlayer(choice):
    for key, values in allplayers.items():
        if choice in values:
            return key
    return None

allplayers = {}

with open('Player Play By Play.csv', mode='r', newline='', encoding='utf-8') as playerdata:
    reader = csv.reader(playerdata)
    
    header = next(reader) #skips the top row of the csv file, which has all the column headers
    
    x=0

    for index, row in enumerate(reader):
        name = row[2] #the player's name
        id = row[3] #assigned in the data set, used to differentiate between potential players with the same name
        team = row[5] #the team the player plays for
        bpturnover = row[17] #number of turnovers caused by bad passes -
        lbturnover = row[18] #turnovers caused by losing control of the ball -
        shootingfouls = row[19] #shooting fouls committed against opponents -
        offensivefouls = row[20] #offensive fouls committed -
        shootfouldrawn = row[21] #shooting fouls drawn from defenders +
        offensivefouldrawn = row[22] #offensive fouls player caused opponents to commit +
        assistpoints = row[23] #points scored by teammates from this player's assists +
        and1 = row[24] #baskets made where the player was fouled and earned an extra free throw +
        fga_blocked = row[25] #any field goal attempt that was blocked by a defender -
        stats = [name,team,bpturnover,lbturnover,shootingfouls,shootfouldrawn,offensivefouldrawn,assistpoints,and1,fga_blocked]
        # player = {id:stats}
        
        if id in allplayers:
            # print(stats)
            # x+=1
            # print(id)
            olddata = allplayers[id]
            newdata = []
            a=2
            while a<9:
                x = int(olddata[a])
                y = int(stats[a])
                z = (x+y)//2
                stats.insert(a, z)
                a+=1
            # print(stats)
                
        allplayers[id] = stats

        if index == 734: #end of 2026 is 734
            break

print(allplayers)
choice = input("Please enter a player's name: ")
playerID = findPlayer(choice)
print(allplayers[playerID])
print(f"{choice}'s prediction score is: {predictionScore(playerID)}")
