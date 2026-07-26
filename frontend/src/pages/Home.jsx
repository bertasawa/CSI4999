import { useState } from "react";
import { Link } from "react-router-dom";
import teams from "../data/teams";
import "./Home.css";

function Home() {
  const [searchText, setSearchText] = useState("");

  const teamResults = teams.filter((team) =>
    team.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const playerResults = teams.flatMap((team) =>
    team.players
      .filter((player) =>
        player.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((player) => ({
        ...player,
        teamName: team.name,
      }))
  );

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>CourtIQ: NBA Stats & Predictions</h1>
        <p>
          Search teams, view player and team statistics, and predict NBA matchups.
        </p>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search teams or players..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-bar"
          />

          {searchText && (
            <div className="search-results">
              <h3>Teams</h3>

              {teamResults.length > 0 ? (
                teamResults.map((team) => (
                  <Link
                    to="/teams"
                    key={team.id}
                    className="search-result-card"
                  >
                    <strong>{team.name}</strong>
                    <span>
                      {team.city}, {team.state}
                    </span>
                  </Link>
                ))
              ) : (
                <p>No teams found.</p>
              )}

              <h3>Players</h3>

              {playerResults.length > 0 ? (
                playerResults.map((player) => (
                  <Link
                    to="/teams"
                    key={`${player.teamName}-${player.id}`}
                    className="search-result-card"
                  >
                    <strong>{player.name}</strong>
                    <span>
                      {player.position} — {player.teamName}
                    </span>
                  </Link>
                ))
              ) : (
                <p>No players found.</p>
              )}
            </div>
          )}
        </div>

        <div className="home-buttons">
          <Link to="/teams" className="home-btn">
            View Teams
          </Link>

          <Link to="/prediction" className="home-btn secondary">
            Make Prediction
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>What You Can Do</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Browse NBA Teams</h3>
            <p>View team records, locations, and players.</p>
          </div>

          <div className="feature-card">
            <h3>Player Stats</h3>
            <p>
              See player performance stats like points, rebounds, and assists.
            </p>
          </div>

          <div className="feature-card">
            <h3>Game Predictions</h3>
            <p>
              Use team and player data to predict a possible winner.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;