import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Digital Wallet
      </Typography>
      <Typography variant="h6" gutterBottom>
        Manage your money effortlessly!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
          sx={{ mr: 2 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/login")}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;