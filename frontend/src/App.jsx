import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Prediction from "./pages/Prediction";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </div>
  );
}

export default App;