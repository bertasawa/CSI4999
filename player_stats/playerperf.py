# season,lg,player,player_id,age,team,pos,g,gs,mp,pg_percent,sg_percent,sf_percent,pf_percent,c_percent,on_court_plus_minus_per_100_poss,net_plus_minus_per_100
# go through the csv file and calculate scores for each player based on the listed stats. calculate new score for new year, then save the average of the existing score with the new one as the player's current score. repeat until present day
# build list of all players with most recent year as listed season. all stats stored are averages of those previous. calculate score based on singular entry, not a bunch of different ones

# import pandas as pd
# df = pd.read_csv('Player Play By Play.csv')
# print(df)

import csv

allplayers = {}

with open('Player Play By Play.csv', mode='r', newline='', encoding='utf-8') as playerdata:
    reader = csv.reader(playerdata)
    
    header = next(reader) #skips the top row of the csv file, which has all the column headers
    
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
        
        allplayers[id] = stats
        if index == 6:
            break

print(allplayers)