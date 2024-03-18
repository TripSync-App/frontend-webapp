"use client";
import React from "react";
import { Box } from "@mui/system";
import { Avatar, Divider, Typography } from "@mui/material";
import { useState } from "react";

const UserPreview = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <Box
      className="flex flex-col p-2 justify-evenly min-w-[25vw] min-h-[50vh ml-2]"
      sx={{ bgcolor: "background.default" }}
    >
      <Typography className="m-auto text-center">
        @{userData.username}
      </Typography>
      <Divider />
      <Avatar
        className="m-auto"
        sx={{ width: "50%", height: "auto", aspectRatio: "1/1" }}
        alt={userData.username}
      />
      <Typography className="m-auto text-center">Email</Typography>
    </Box>
  );
};

export default UserPreview;
