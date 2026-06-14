import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">

        {/* Left side: main homepage text */}
        <div className="hero-text">
          <p className="tagline">Basketball Prediction Web App</p>

          <h1>Explore players. Compare teams. Predict matchups.</h1>

          <p className="hero-description">
            Select a team to view its roster, player photos, and stats.
            Then compare two teams to predict who would win.
          </p>

          <div className="hero-buttons">
            <Link to="/teams" className="primary-button">
              Explore Teams
            </Link>

            <Link to="/predict" className="secondary-button">
              Predict Matchup
            </Link>
          </div>
        </div>

        {/* Right side: preview card */}
        <div className="preview-card">
          <h2>Player Stat Preview</h2>

          <div className="fake-player-card">
            <div className="fake-player-image">
              Player Photo
            </div>

            <div>
              <h3>Player Name</h3>
              <p>PPG: 24.5</p>
              <p>RPG: 7.1</p>
              <p>APG: 8.3</p>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}

export default Home;