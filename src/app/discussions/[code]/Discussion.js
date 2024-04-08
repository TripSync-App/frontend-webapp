import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Map from "./Map";

const Discussion = ({ discussion }) => {
  //TODO: load messages using useEffect
  return (
    <>
      <div className="flex flex-row mr-auto ml-auto h-[75vh] w-[75vw]">
        <div id="mainContent">
          <Typography variant="h3">{discussion.title}</Typography>
          <div className="p-4 h-[50%] w-full">
            <Map></Map>
          </div>
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
