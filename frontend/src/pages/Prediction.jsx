import { useState } from "react";
import { Link } from "react-router-dom";
import { getPrediction } from "../api";
import teams from "../data/teams";
import "./Prediction.css";

function Prediction() {
  const teamOptions = Array.isArray(teams)
    ? teams.map((team) => {
        if (typeof team === "string") {
          return {
            name: team,
            code: team,
          };
        }

        return {
          name: team.name || team.teamName,
          code:
            team.code ||
            team.abbreviation ||
            team.abbr ||
            team.teamCode,
        };
      })
    : Object.entries(teams).map(([code, team]) => {
        if (typeof team === "string") {
          return {
            name: team,
            code,
          };
        }

        return {
          name: team.name || team.teamName || code,
          code:
            team.code ||
            team.abbreviation ||
            team.abbr ||
            team.teamCode ||
            code,
        };
      });

  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");
  const [teamOneChance, setTeamOneChance] = useState(0);
  const [teamTwoChance, setTeamTwoChance] = useState(0);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getTeamName = (teamCode) => {
    const team = teamOptions.find((option) => option.code === teamCode);
    return team?.name || teamCode;
  };

  const handlePredict = async () => {
    if (!teamOne || !teamTwo) {
      setError("Please select both teams first.");
      setHasPredicted(false);
      return;
    }

    if (teamOne === teamTwo) {
      setError("Please select two different teams.");
      setHasPredicted(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHasPredicted(false);

      const result = await getPrediction(teamOne, teamTwo);

      console.log("Prediction response:", result);

      const winner = result[0];
      const winnerProbability = Number(result[1]);

      if (!Number.isFinite(winnerProbability)) {
        throw new Error("The backend returned an invalid probability.");
      }

      const winnerChance =
        Math.round(winnerProbability * 1000) / 10;

      const loserChance =
        Math.round((100 - winnerChance) * 10) / 10;

      if (winner === teamOne) {
        setTeamOneChance(winnerChance);
        setTeamTwoChance(loserChance);
      } else if (winner === teamTwo) {
        setTeamOneChance(loserChance);
        setTeamTwoChance(winnerChance);
      } else {
        throw new Error(
          `The backend returned ${winner}, but you selected ${teamOne} and ${teamTwo}.`
        );
      }

      setHasPredicted(true);
    } catch (error) {
      console.error("Prediction error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            onChange={(event) => {
              setTeamOne(event.target.value);
              setHasPredicted(false);
              setError("");
            }}
            className="team-select"
          >
            <option value="">Select a team</option>

            {teamOptions.map((team) => (
              <option key={team.code} value={team.code}>
                {team.name}
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
            onChange={(event) => {
              setTeamTwo(event.target.value);
              setHasPredicted(false);
              setError("");
            }}
            className="team-select"
          >
            <option value="">Select a team</option>

            {teamOptions.map((team) => (
              <option key={team.code} value={team.code}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="predict-button"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Winner"}
        </button>

        {error && <p className="prediction-error">{error}</p>}

        <div className="prediction-result-card">
          <h2>Winning Percentage</h2>

          {!hasPredicted ? (
            <p className="empty-prediction">
              Choose two teams and click predict.
            </p>
          ) : (
            <>
              <div className="percent-row">
                <span>{getTeamName(teamOne)}</span>
                <strong>{teamOneChance}%</strong>
              </div>

              <div className="percent-bar">
                <div style={{ width: `${teamOneChance}%` }}></div>
              </div>

              <div className="percent-row">
                <span>{getTeamName(teamTwo)}</span>
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