import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Homepage from "./Homepage"
import Dashboard from "./Dashboard";
import Applications from "./Applications";
import Register from "./Register";
import SignInCompany from "./SignInCompany";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/company-signin" element={<SignInCompany />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/applications" element={<Applications />} />
    <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
