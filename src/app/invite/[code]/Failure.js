import React from "react";
import { Paper } from "@mui/material";

const Failure = () => {
  return (
    <div id="info" className="flex justify-center translate-y-[25vh]">
      <Paper elevation={3} className="min-w-[50%] min-h-[50vh] text-center">
        <p>Failure to join</p>
      </Paper>
    </div>
  );
};

export default Failure;
