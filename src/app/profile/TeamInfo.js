import React from "react";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { API_URL } from "../constants";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
} from "@mui/material";

const TeamInfo = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("accessToken");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    try {
      fetch(`${API_URL}/teams/member`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTeams(data.teams);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Box
      className="mt-4 mr-2 p-2 ml-auto h-[85vh] overflow-scroll"
      sx={{ bgcolor: "background.paper" }}
    >
      <Typography>Your Teams</Typography>
      {teams.map((team, index) => (
        <Card sx={{ maxHeight: "50%", maxWidth: "20vw", mb: 2 }} key={index}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {team.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Owned by: @{team.admin_user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {team.members.slice(0, 4).map((member, index) => (
                <span key={index}>
                  {member.first_name} {member.last_name}
                  {index < 3 && ", "}
                </span>
              ))}
              {team.members.length > 4 &&
                `, and ${team.members.length - 4} more`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Leave Team</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default TeamInfo;
