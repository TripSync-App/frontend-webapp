import React, { useEffect, useState } from "react";
import { Box, List } from "@mui/material";
import MessageBlock from "./MessageBlock";
import { API_URL } from "../constants";

const UserActivity = () => {
  const token = localStorage.getItem("accessToken");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/messages`, {
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

  return (
    <Box className="w-full overflow-scroll">
      <h1>Your Activity</h1>
      <List>
        {messages.map((message, index) => (
          <MessageBlock message={message} key={index}></MessageBlock>
        ))}
      </List>
    </Box>
  );
};

export default UserActivity;
