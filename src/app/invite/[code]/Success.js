import React from "react";
import { Typography, Paper } from "@mui/material";

const styles = {
  root: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 9999,
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
  },

  successIcon: {
    fontSize: "60px",
    color: "#4caf50",
  },
};

const SuccessPage = () => {
  return (
    <Paper
      elevation={0}
      style={styles.root}
      className="border-2 border-green-500 w-[25vw] p-3"
    >
      <Typography variant="h4" gutterBottom style={{ color: "#4caf50" }}>
        Success!
      </Typography>
      <Typography variant="body1" style={{ color: "#333333" }}>
        Joined team.
      </Typography>
    </Paper>
  );
};

export default SuccessPage;
