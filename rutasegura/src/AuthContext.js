import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); // State to store fetched user data
  const navigate = useNavigate();

  // Fetch user data from the database
  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched users:", data); // Log the fetched data
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const login = (username, password) => {
    // Check if the provided username and password match any user in the database
    const user = users.find(
      (user) => user.usuario === username && user.contrasena === password
    );

    if (user) {
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
