import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vote from "./pages/Vote";
import Candidates from "./pages/Candidates";
import ElectionStatus from "./pages/ElectionStatus";
import ForgotPassword from "./pages/ForgotPass";
import ResetPassword from "./pages/ResetPass";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/status" element={<ElectionStatus />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/vote" element={<Vote candidate={{ id: "1", name: "Candidate Name" , photo : "", manifesto : ""}} electionId="1" />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="*" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
