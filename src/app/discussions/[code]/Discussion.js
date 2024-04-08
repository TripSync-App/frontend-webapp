import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const Discussion = ({ discussion }) => {
  //TODO: load messages using useEffect
  return (
    <>
      <div className="flex flex-row mr-auto ml-auto">
        <div id="mainContent">
          <Typography variant="h3">{discussion.title}</Typography>
          <div id="messages">
            <Typography variant="h4">Messages</Typography>
          </div>
        </div>
        <div id="sideBar">Test</div>
      </div>
    </>
  );
};

export default Discussion;
