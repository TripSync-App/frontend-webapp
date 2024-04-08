import { Typography } from "@mui/material";
import React from "react";

const Discussion = ({ discussion }) => {
  return (
    <>
      <div>
        <Typography>{discussion.title}</Typography>
      </div>
    </>
  );
};

export default Discussion;
