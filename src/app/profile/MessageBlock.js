"use client";
import React, { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { useTheme, useMediaQuery } from "@mui/material";

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
  let userData = {};
  let token = "";

  try {
    userData = JSON.parse(localStorage.getItem("userData"));
    token = localStorage.getItem("accessToken");
  } catch (e) {}

  const [profilePic, setProfilePic] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
    <ListItem
      className="rounded-md mb-2 max-sm:h-24"
      sx={{ bgcolor: "background.paper" }}
    >
      <ListItemAvatar>
        <Avatar
          alt={`${message.author.first_name} ${message.author.last_name}`}
          src={profilePic}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            variant="body1"
            className={isSmallScreen ? "text-xs" : "text-base"}
          >
            {message.vacation.name}
          </Typography>
        }
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
              className={isSmallScreen ? "text-xs" : "text-sm"}
            >
              {message.discussion.title} -{" "}
              {userData.username === message.author.username
                ? "You"
                : `${message.author.first_name} ${message.author.last_name}`}
            </Typography>
            <Typography
              variant="body2"
              className={isSmallScreen ? "text-xs" : "text-sm"}
            >
              {formatText(message.text)}
            </Typography>
          </React.Fragment>
        }
      />
      <Typography
        variant="body2"
        color="gray"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          mr: 2,
          mt: 2,
          fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
        }}
      >
        {formatDate(message.timestamp)}
      </Typography>
    </ListItem>
  );
};

export default MessageBlock;
