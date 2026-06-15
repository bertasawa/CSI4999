import { useState } from "react";
import { Link } from "react-router-dom";
import "./Teams.css";
import teams from "../data/teams";

function Teams() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedView, setSelectedView] = useState("roster");
  const [selectedPlayerStats, setSelectedPlayerStats] = useState(null);

  function handleTeamClick(team) {
    setSelectedTeam(team);
    setSelectedView("roster");
    setSelectedPlayerStats(null);
  }

  function getPlayerStats(playerName) {
    fetch(`/api/player/?name=${encodeURIComponent(playerName)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedPlayerStats(data);
      })
      .catch((error) => {
        console.log("Error getting player data:", error);
      });
  }

  function getStatValue(statName) {
    if (!selectedPlayerStats || !selectedPlayerStats[statName]) {
      return "N/A";
    }
  
    return Object.values(selectedPlayerStats[statName])[0];
  }

  return (
    <div className="teams-page">
      <Link to="/" className="home-link">
        Home
      </Link>

      <h1 className="teams-title">NBA Teams</h1>
      <div className="title-line"></div>

      <div className="teams-grid">
        {teams.map((team) => (
          <button
          key={team.id}
          className="team-card"
          onClick={() => handleTeamClick(team)}
        >
          <img
            src={`/team-logos/${team.abbreviation}.png`}
            alt={`${team.name} logo`}
            className="team-logo-bg"
          />
        
          <div className="team-card-overlay">
            <h2>{team.name}</h2>
          </div>
        </button>
        ))}
      </div>

      {selectedTeam && (
        <div className="team-details">
          <h1>{selectedTeam.name}</h1>

          <div className="details-buttons">
            <button
              className={selectedView === "roster" ? "active-tab" : ""}
              onClick={() => {
                setSelectedView("roster");
                setSelectedPlayerStats(null);
              }}
            >
              Roster
            </button>

            <button
              className={selectedView === "stats" ? "active-tab" : ""}
              onClick={() => {
                setSelectedView("stats");
                setSelectedPlayerStats(null);
              }}
            >
              Stats
            </button>
          </div>

          {selectedView === "roster" && (
            <div className="roster-section">
              <h3>Roster</h3>

              {selectedTeam.players && selectedTeam.players.length > 0 ? (
                <div className="players-grid">
                  {selectedTeam.players.map((player) => (
                    <div key={player.id} className="player-card">
                      <h3>{player.name}</h3>
                      <p>Position: {player.position}</p>

                      <button onClick={() => getPlayerStats(player.name)}>
                        View Stats
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No roster added yet.</p>
              )}

              {selectedPlayerStats && (
                <div className="player-stats-card">
                  <h2>{getStatValue("player")}</h2>
                  <p className="player-team">Team: {getStatValue("team")}</p>

                  <div className="stats-grid">
                    <div className="stat-box">
                      <h3>{getStatValue("pts_per_game")}</h3>
                      <p>Points</p>
                    </div>

                    <div className="stat-box">
                      <h3>{getStatValue("trb_per_game")}</h3>
                      <p>Rebounds</p>
                    </div>

                    <div className="stat-box">
                      <h3>{getStatValue("ast_per_game")}</h3>
                      <p>Assists</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedView === "stats" && (
            <div className="stats-section">
              <h3>Team Stats</h3>
              <p>City: {selectedTeam.city}</p>
              <p>State: {selectedTeam.state}</p>
              <p>Abbreviation: {selectedTeam.abbreviation}</p>
              <p>Wins: {selectedTeam.wins}</p>
              <p>Losses: {selectedTeam.losses}</p>
              <p>
                Record: {selectedTeam.wins}-{selectedTeam.losses}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Teams;