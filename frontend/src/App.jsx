import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Predict from "./pages/Predict";

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">CourtIQ</Link>

        <div className="nav-links">
          <Link to="/teams">Teams</Link>
          <Link to="/predict">Predict</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
    </div>
  );
}

export default App;