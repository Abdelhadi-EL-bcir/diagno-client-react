import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct the import
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Diagnostic from "./pages/diagonstic/Diagnostic";
import "./App.css";
import Acceuil from "./pages/diagonstic/Acceuil";
import Support from "./pages/diagonstic/Support";
import Question from "./components/question/Question";
import Result from "./pages/diagonstic/Result";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diagno" element={<Diagnostic/>} >
           <Route index path="/diagno" element={<Acceuil/>}/>
           <Route path="/diagno/support" element={<Support/>}/>
           <Route path="/diagno/test/:diagnosticId" element={<Question/>}/>
           <Route path="/diagno/result/:id" element={<Result/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
