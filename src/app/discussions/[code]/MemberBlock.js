import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useTheme,
} from "@mui/material";

const MemberBlock = ({ member }) => {
  const [profilePic, setProfilePic] = useState("");
  const theme = useTheme();

  useEffect(() => {
    let token = "";
    let userData = "";
    try {
      userData = JSON.parse(localStorage.getItem("userData"));
      token = localStorage.getItem("accessToken");
    } catch {}

    const fetchProfilePic = async () => {
      try {
        const response = await fetch(`/api/users/pfp/${member.username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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
      className="rounded-md animate-fade-right"
      sx={{ backgroundColor: theme.palette.lighten, mb: 1 }}
    >
      <ListItemAvatar>
        <Avatar
          alt={`${member.first_name} ${member.last_name}`}
          src={profilePic}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            {member.first_name} {member.last_name}
          </>
        }
      ></ListItemText>
    </ListItem>
  );
};

export default MemberBlock;
