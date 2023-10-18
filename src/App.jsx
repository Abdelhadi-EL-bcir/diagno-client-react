import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct the import
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Diagnostic from "./pages/diagonstic/Diagnostic";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diagno" element={<Diagnostic/>} />
      </Routes>
    </Router>
  );
}

export default App;
