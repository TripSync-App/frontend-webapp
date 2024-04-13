import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useTheme,
  Tooltip,
} from "@mui/material";
import { AdminPanelSettings, Grade } from "@mui/icons-material";

const MemberBlock = ({ member, isAdmin = false }) => {
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
      className="rounded-md animate-fade-right shadow-md "
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
          <div className="flex flex-row items-center">
            {member.first_name} {member.last_name}
            {isAdmin ? (
              <Tooltip title="Admin">
                <Grade fontSize="small" className="ml-2"></Grade>
              </Tooltip>
            ) : null}
          </div>
        }
      ></ListItemText>
    </ListItem>
  );
};

export default MemberBlock;
