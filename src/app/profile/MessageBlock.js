import React, { useEffect, useState } from "react";
import { API_URL } from "../constants";

import {
  Box,
  List,
  ListItemIcon,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const MessageBlock = ({ message }) => {
  const token = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [profilePic, setProfilePic] = useState("");
  const MAX_TEXT_LENGTH = 30;

  const formatText = (text) => {
    if (text.length > MAX_TEXT_LENGTH) {
      return text.slice(0, MAX_TEXT_LENGTH) + "...";
    }
    return text;
  };
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.toLocaleString()}`;
  };

  useEffect(() => {
    const fetchProfilePic = async () => {
      console.log(message.author.username);
      try {
        const response = await fetch(
          `/api/users/pfp/${message.author.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.blob();
          const imageUrl = URL.createObjectURL(data);
          setProfilePic(imageUrl);
        } else {
          console.error("Error fetching profile picture:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error.message);
      }
    };

    fetchProfilePic();
  }, []);

  return (
    <ListItem className="rounded-md mb-2" sx={{ bgcolor: "background.paper" }}>
      <ListItemAvatar>
        <Avatar
          alt={`${message.author.first_name} ${message.author.last_name}`}
          src={profilePic}
        />
      </ListItemAvatar>
      <ListItemText
        primary={message.vacation.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {message.discussion.title} -{" "}
              {userData.username === message.author.username
                ? "You"
                : `${message.author.first_name} ${message.author.last_name}`}
            </Typography>
            <Typography>{formatText(message.text)}</Typography>
          </React.Fragment>
        }
      />
      <Typography
        variant="body2"
        color="gray"
        sx={{ position: "absolute", top: 0, right: 0, mr: 2, mt: 2 }}
      >
        {formatDate(message.timestamp)}
      </Typography>
    </ListItem>
  );
};

export default MessageBlock;
