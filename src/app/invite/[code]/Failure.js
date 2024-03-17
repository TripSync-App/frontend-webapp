import React from "react";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";

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
};

const Failure = () => {
  return (
    <Paper
      elevation={0}
      style={styles.root}
      className="border-2 border-green-500 w-[25vw] p-3"
    >
      <Typography variant="h4" gutterBottom style={{ color: "#ff1100" }}>
        Error!
      </Typography>
      <Typography variant="body1" style={{ color: "#333333" }}>
        Invite code invalid
      </Typography>
    </Paper>
  );
};

export default Failure;
