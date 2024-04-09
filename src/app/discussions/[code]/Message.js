import {
  ListItem,
  ListItemAvatar,
  Typography,
  Avatar,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/app/lib";

const Message = ({ message }) => {
  let token = "";
  let userData = "";
  try {
    userData = JSON.parse(localStorage.getItem("userData"));
    token = localStorage.getItem("accessToken");
  } catch {}
  const [profilePic, setProfilePic] = useState("");
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
    <>
      <ListItem
        sx={{ backgroundColor: theme.palette.hueShift, mb: 1 }}
        className="rounded-md"
      >
        <ListItemAvatar>
          <Avatar
            alt={`${message.author.first_name} ${message.author.last_name}`}
            src={profilePic}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <div className="flex">
                <Typography
                  sx={{
                    display: "inline",
                    color: theme.palette.fontColor,
                    mr: 1,
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                  component="span"
                  variant="body1"
                  className={isSmallScreen ? "text-xs" : "text-sm"}
                >
                  {userData.username === message.author.username
                    ? "You"
                    : `${message.author.first_name} ${message.author.last_name}`}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ color: theme.palette.fontColor }}
                  className={isSmallScreen ? "text-xs" : "text-sm"}
                >
                  {formatDate(message.timestamp)}
                </Typography>
              </div>
            </>
          }
          secondary={
            <React.Fragment>
              <Typography
                variant="body2"
                className={isSmallScreen ? "text-xs" : "text-sm"}
                sx={{ color: theme.palette.fontColor }}
              >
                {message.text}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
};

export default Message;
