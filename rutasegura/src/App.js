import './App.css';
import { useAuth } from "./AuthContext";
import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Api from "./Api"


function ApiFun() {
  return (
    <div>
      <Navigation />
      <Api />
    </div>
  );
}

function Home() {
  return (
    <div>
      <Navigation />
      <h1>Inicio</h1>
    </div>
  );
}

function About() {
  return (
    <div>
      <Navigation />
      <h1>Sobre</h1>
    </div>
  );
}

function Contacts() {
  return (
    <div>
      <Navigation />
      <h1>Contactos</h1>
    </div>
  );
}

function Notification() {
  return (
    <div>
      <Navigation />
      <h1>Notificaciones</h1>
    </div>
  );
}

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password); // Pass credentials to login function
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="logo"></div>
      <div className="container">
        <p style={{ fontFamily: "verdana", fontSize: 48 }}>Login</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/api"
            element={
              <ProtectedRoute>
                <ApiFun />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

