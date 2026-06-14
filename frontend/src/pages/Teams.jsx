import { useState } from "react";

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
  const [selectedTeam, setSelectedTeam] = useState("Detroit Pistons");

  const players = teams[selectedTeam];

  return (
    <main className="teams-page">
      <section className="teams-header">
        <p className="tagline">Team Rosters</p>
        <h1>Explore Players</h1>
        <p>
          Select a team to view its players. Hover over each player card to see
          their stats.
        </p>

        <select
          className="team-select"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          {Object.keys(teams).map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </section>

      <section className="players-grid">
        {players.map((player) => (
          <div className="player-card" key={player.name}>
            <div className="player-photo">
              <span>#{player.number}</span>
            </div>

            <div className="player-info">
              <h2>{player.name}</h2>
              <p>{player.position}</p>
            </div>

            <div className="player-stats">
              <h3>Stats</h3>
              <p>PPG: {player.stats.ppg}</p>
              <p>RPG: {player.stats.rpg}</p>
              <p>APG: {player.stats.apg}</p>
              <p>FG%: {player.stats.fg}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Teams;