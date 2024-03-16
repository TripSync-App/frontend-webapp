import React from "react";
import { Paper } from "@mui/material";

const Success = () => {
  return (
    <div id="info" className="flex justify-center translate-y-[25vh]">
      <Paper elevation={3} className="min-w-[50%] min-h-[50vh] text-center">
        <p>Success</p>
      </Paper>
    </div>
  );
};

export default Success;
