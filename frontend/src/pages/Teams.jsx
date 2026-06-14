import { useState } from "react";
import "./Teams.css"

const teams = [
  {
    id: 1,
    name: "Phoenix Suns",
    city: "Phoenix",
    state: "AZ",
    abbreviation: "PHX",
    wins: 0,
    losses: 0,
  },
  {
    id: 2,
    name: "Golden State Warriors",
    city: "San Francisco",
    state: "CA",
    abbreviation: "GSW",
    wins: 0,
    losses: 0,
  },
  {
    id: 3,
    name: "Los Angeles Clippers",
    city: "Los Angeles",
    state: "CA",
    abbreviation: "LAC",
    wins: 0,
    losses: 0,
  },
  {
    id: 4,
    name: "Los Angeles Lakers",
    city: "Los Angeles",
    state: "CA",
    abbreviation: "LAL",
    wins: 0,
    losses: 0,
  },
  {
    id: 5,
    name: "Sacramento Kings",
    city: "Sacramento",
    state: "CA",
    abbreviation: "SAC",
    wins: 0,
    losses: 0,
  },
  {
    id: 6,
    name: "Denver Nuggets",
    city: "Denver",
    state: "CO",
    abbreviation: "DEN",
    wins: 0,
    losses: 0,
  },
  {
    id: 7,
    name: "Washington Wizards",
    city: "Washington",
    state: "DC",
    abbreviation: "WAS",
    wins: 0,
    losses: 0,
  },
  {
    id: 8,
    name: "Miami Heat",
    city: "Miami",
    state: "FL",
    abbreviation: "MIA",
    wins: 0,
    losses: 0,
  },
  {
    id: 9,
    name: "Orlando Magic",
    city: "Orlando",
    state: "FL",
    abbreviation: "ORL",
    wins: 0,
    losses: 0,
  },
  {
    id: 10,
    name: "Atlanta Hawks",
    city: "Atlanta",
    state: "GA",
    abbreviation: "ATL",
    wins: 0,
    losses: 0,
  },
  {
    id: 11,
    name: "Chicago Bulls",
    city: "Chicago",
    state: "IL",
    abbreviation: "CHI",
    wins: 0,
    losses: 0,
  },
  {
    id: 12,
    name: "Indiana Pacers",
    city: "Indianapolis",
    state: "IN",
    abbreviation: "IND",
    wins: 0,
    losses: 0,
  },
  {
    id: 13,
    name: "New Orleans Pelicans",
    city: "New Orleans",
    state: "LA",
    abbreviation: "NOP",
    wins: 0,
    losses: 0,
  },
  {
    id: 14,
    name: "Boston Celtics",
    city: "Boston",
    state: "MA",
    abbreviation: "BOS",
    wins: 0,
    losses: 0,
  },
  {
    id: 15,
    name: "Detroit Pistons",
    city: "Detroit",
    state: "MI",
    abbreviation: "DET",
    wins: 0,
    losses: 0,
  },
  {
    id: 16,
    name: "Minnesota Timberwolves",
    city: "Minneapolis",
    state: "MN",
    abbreviation: "MIN",
    wins: 0,
    losses: 0,
  },
  {
    id: 17,
    name: "Charlotte Hornets",
    city: "Charlotte",
    state: "NC",
    abbreviation: "CHA",
    wins: 0,
    losses: 0,
  },
  {
    id: 18,
    name: "Brooklyn Nets",
    city: "Brooklyn",
    state: "NY",
    abbreviation: "BKN",
    wins: 0,
    losses: 0,
  },
  {
    id: 19,
    name: "New York Knicks",
    city: "New York",
    state: "NY",
    abbreviation: "NYK",
    wins: 0,
    losses: 0,
  },
  {
    id: 20,
    name: "Cleveland Cavaliers",
    city: "Cleveland",
    state: "OH",
    abbreviation: "CLE",
    wins: 0,
    losses: 0,
  },
  {
    id: 21,
    name: "Oklahoma City Thunder",
    city: "Oklahoma City",
    state: "OK",
    abbreviation: "OKC",
    wins: 0,
    losses: 0,
  },
  {
    id: 22,
    name: "Toronto Raptors",
    city: "Toronto",
    state: "ON",
    abbreviation: "TOR",
    wins: 0,
    losses: 0,
  },
  {
    id: 23,
    name: "Portland Trail Blazers",
    city: "Portland",
    state: "OR",
    abbreviation: "POR",
    wins: 0,
    losses: 0,
  },
  {
    id: 24,
    name: "Philadelphia 76ers",
    city: "Philadelphia",
    state: "PA",
    abbreviation: "PHI",
    wins: 0,
    losses: 0,
  },
  {
    id: 25,
    name: "Memphis Grizzlies",
    city: "Memphis",
    state: "TN",
    abbreviation: "MEM",
    wins: 0,
    losses: 0,
  },
  {
    id: 26,
    name: "Dallas Mavericks",
    city: "Dallas",
    state: "TX",
    abbreviation: "DAL",
    wins: 0,
    losses: 0,
  },
  {
    id: 27,
    name: "Houston Rockets",
    city: "Houston",
    state: "TX",
    abbreviation: "HOU",
    wins: 0,
    losses: 0,
  },
  {
    id: 28,
    name: "San Antonio Spurs",
    city: "San Antonio",
    state: "TX",
    abbreviation: "SAS",
    wins: 0,
    losses: 0,
  },
  {
    id: 29,
    name: "Utah Jazz",
    city: "Salt Lake City",
    state: "UT",
    abbreviation: "UTA",
    wins: 0,
    losses: 0,
  },
  {
    id: 30,
    name: "Milwaukee Bucks",
    city: "Milwaukee",
    state: "WI",
    abbreviation: "MIL",
    wins: 0,
    losses: 0,
  },
];

function Teams() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div className="teams-page">
      <h1>NBA Teams</h1>

      <div className="teams-grid">
        {teams.map((team) => (
          <button
            key={team.id}
            className="team-card"
            onClick={() => setSelectedTeam(team)}
          >
            <h2>{team.name}</h2>
            <p>
              {team.city}, {team.state}
            </p>
            <p>{team.abbreviation}</p>
            <p>
              Record: {team.wins}-{team.losses}
            </p>
          </button>
        ))}
      </div>

      {selectedTeam && (
        <div className="team-details">
          <h2>{selectedTeam.name} Players</h2>

          <div className="players-grid">
            {selectedTeam.players.map((player) => (
              <div key={player.id} className="player-card">
                <h3>{player.name}</h3>
                <p>Position: {player.position}</p>
                <p>Points: {player.points}</p>
                <p>Rebounds: {player.rebounds}</p>
                <p>Assists: {player.assists}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;