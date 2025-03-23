import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Divider } from "@mui/material";

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    usernameOrEmail: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Register a new user
      try {
        const response = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        alert(data.message); // Success message
        setIsRegistering(false); // Switch back to login
        setErrorMessage(""); // Clear any existing error message
      } catch (error) {
        setErrorMessage(error.message); // Set error message for duplicate username/email
      }
    } else {
      // Login an existing user
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usernameOrEmail: formData.usernameOrEmail,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        // Save user authentication state
        setIsAuthenticated(true);
        setIsAdmin(data.isAdmin);
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        navigate(data.isAdmin ? "/admin" : "/dashboard");
        setErrorMessage(""); // Clear any existing error message
      } catch (error) {
        setErrorMessage(error.message); // Display login error message
      }
    }
  };

  return (
    <Box sx={{ mt: 4, maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        {isRegistering ? "Register" : "Login"}
      </Typography>
      {errorMessage && ( // Show error message if it exists
        <Typography
          variant="body1"
          color="error"
          align="center"
          sx={{ mb: 2 }}
        >
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        {isRegistering ? (
          <>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </>
        ) : (
          <>
            <TextField
              label="Username or Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.usernameOrEmail}
              onChange={(e) =>
                setFormData({ ...formData, usernameOrEmail: e.target.value })
              }
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {isRegistering ? "Register" : "Login"}
        </Button>
      </form>
      <Divider sx={{ my: 3 }} />
      <Typography variant="body2" align="center">
        {isRegistering
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <Button
          variant="text"
          color="secondary"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage(""); // Clear error message when toggling
          }}
        >
          {isRegistering ? "Login here" : "Register now"}
        </Button>
      </Typography>
    </Box>
  );
};

export default Login;
