import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ElectionControl from "./pages/ElectionControl";
import CandidateManagement from "./pages/CandidateManagement";
import RealTimeResults from "./pages/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admDash" element={<AdminDashboard />} />
        <Route path="/control" element={<ElectionControl />} />
        <Route path="/canlst" element={<CandidateManagement/>} />
        <Route path="/res" element={<RealTimeResults />} />
        <Route path="*" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
