import React from "react";
import { Link } from "react-router-dom";


function Navigation() {
  return (
    
    <div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="topnav">
          
          <Link to="/home">Inicio</Link>
          <Link to="/notifications">Notificaciones</Link>
          <Link to="/contact">Contactos</Link>
          <Link to="/about">Soporte</Link>
          <Link to="/api">Api</Link>
          <Link className="end" to="/">Exit</Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;

