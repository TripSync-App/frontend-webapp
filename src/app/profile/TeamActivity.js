"use client";
import React, { useEffect, useState } from "react";
import { Box, List, Typography, useTheme } from "@mui/material";
import MessageBlock from "./MessageBlock";

const TeamActivity = () => {
  let token = "";
  try {
    token = localStorage.getItem("accessToken");
  } catch {}
  const theme = useTheme();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/messages/team`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [token]);

  const textColor = theme.palette.mode === "light" ? "#000000" : "#FFFFFF";
  return (
    <Box className="w-full overflow-scroll">
      <Typography
        variant="h6"
        align="center"
        style={{
          color: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
          color: theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF",
          fontSize: "1.2rem",
          marginBottom: "1rem",
        }}
      >
        Activity for Teams you are in
      </Typography>
      <List>
        {messages.map((message, index) => (
          <MessageBlock message={message} key={index}></MessageBlock>
        ))}
      </List>
    </Box>
  );
};

export default TeamActivity;
