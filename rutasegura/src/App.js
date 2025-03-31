import './App.css';
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
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
    login(username, password); 
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
        <div>
          <a href="/register">¿Eres nuevo?</a>
        </div>
        <a href="/recuperacion">¿Se te olvido tu contraseña?</a>
      </div>
    </div>
  );
}

function Register() {
  return (
    <div className="container">
      <p style={{ fontFamily: "verdana", fontSize: 48 }}>Register</p>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

function Recuperacion() {
  return (
    <div className="container">
      <p style={{ fontFamily: "verdana", fontSize: 48 }}>Recuperacion</p>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="text" placeholder="Email" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}



function App() {
  useEffect(() => {
    fetch('http://localhost:8081/users') 
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
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
            path="/register"
            element={
                <Register />
            }
          />
          <Route
            path="/recuperacion"
            element={
              <Recuperacion />
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

