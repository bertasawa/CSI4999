import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Basketball Prediction System</h1>
        <p>
          Compare teams, view player stats, and predict which team has the
          better chance to win.
        </p>

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
            <p>View team records, locations, abbreviations, and players.</p>
          </div>

          <div className="feature-card">
            <h3>Player Stats</h3>
            <p>See player performance stats like points, rebounds, and assists.</p>
          </div>

          <div className="feature-card">
            <h3>Game Predictions</h3>
            <p>Use team and player data to predict a possible winner.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;