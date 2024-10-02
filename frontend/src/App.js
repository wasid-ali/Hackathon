import React, { Profiler } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import DocumentQA from "./containers/DocumentQA";
import Dashboard from "./containers/Dashboard";
import Logout from "./views/Logout";
import Profile from "./containers/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/document-qa" element={<DocumentQA />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
