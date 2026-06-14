import { useState } from "react";

const teams = [
    {
      id: 1,
      name: "Detroit Pistons",
      city: "Detroit",
      abbreviation: "DET",
      wins: 0,
      losses: 0,
    },
    {
      id: 2,
      name: "Boston Celtics",
      city: "Boston",
      abbreviation: "BOS",
      wins: 0,
      losses: 0,
    },
    {
      id: 3,
      name: "Los Angeles Lakers",
      city: "Los Angeles",
      abbreviation: "LAL",
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