import { useState } from "react";
import { Link } from "react-router-dom";
import teams from "../data/teams";
import "./Prediction.css";

function Prediction() {
  const teamOptions = Array.isArray(teams)
    ? teams.map((team) =>
        typeof team === "string" ? team : team.name || team.teamName
      )
    : Object.keys(teams);

  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");
  const [teamOneChance, setTeamOneChance] = useState(0);
  const [teamTwoChance, setTeamTwoChance] = useState(0);
  const [hasPredicted, setHasPredicted] = useState(false);

  function handlePredict() {
    if (!teamOne || !teamTwo) {
      alert("Please select both teams first.");
      return;
    }

    if (teamOne === teamTwo) {
      alert("Please select two different teams.");
      return;
    }

    // Backend is not ready yet, so keep these at 0 for now
    setTeamOneChance(0);
    setTeamTwoChance(0);
    setHasPredicted(true);
  }

  return (
    <div className="prediction-page">
      <Link to="/" className="home-link">
        Home
      </Link>
      <h1 className="prediction-title">Game Prediction</h1>

      <p className="prediction-subtitle">
        Pick two teams to compare their chances of winning.
      </p>

      <div className="prediction-flow">
        <div className="team-pick-card left-card">
          <h2>Team 1</h2>

          <select
            value={teamOne}
            onChange={(e) => setTeamOne(e.target.value)}
            className="team-select"
          >
            <option value="">Select a team</option>
            {teamOptions.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <div className="connector horizontal-line"></div>
        <div className="connector vertical-line"></div>

        <div className="team-pick-card right-card">
          <h2>Team 2</h2>

          <select
            value={teamTwo}
            onChange={(e) => setTeamTwo(e.target.value)}
            className="team-select"
          >
            <option value="">Select a team</option>
            {teamOptions.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <button className="predict-button" onClick={handlePredict}>
          Predict Winner
        </button>

        <div className="prediction-result-card">
          <h2>Winning Percentage</h2>

          {!hasPredicted ? (
            <p className="empty-prediction">Choose two teams and click predict.</p>
          ) : (
            <>
              <div className="percent-row">
                <span>{teamOne}</span>
                <strong>{teamOneChance}%</strong>
              </div>

              <div className="percent-bar">
                <div style={{ width: `${teamOneChance}%` }}></div>
              </div>

              <div className="percent-row">
                <span>{teamTwo}</span>
                <strong>{teamTwoChance}%</strong>
              </div>

              <div className="percent-bar">
                <div style={{ width: `${teamTwoChance}%` }}></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prediction;