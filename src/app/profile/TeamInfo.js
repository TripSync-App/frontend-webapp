"use client";
import React from "react";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { modal_style } from "../constants";
import { Typography, Modal, useTheme } from "@mui/material";
import { Card, CardContent, Button, CardActions } from "@mui/material";

const TeamInfo = () => {
  let userData = {};
  let token = "";
  try {
    userData = JSON.parse(localStorage.getItem("userData"));
    token = localStorage.getItem("accessToken");
  } catch {}

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleOpen = (team) => {
    setSelectedTeam(team);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleLeave = async (selectedTeam) => {
    try {
      await fetch(`/api/teams/remove-user`, {
        method: "POST",
        body: JSON.stringify({
          team: { team_id: selectedTeam.team_id },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    try {
      fetch(`/api/teams/member`, {
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
      className="mt-4 mr-2 p-2 ml-auto h-[90vh] overflow-scroll min-w-[20vw]"
      style={{ backgroundColor: theme.palette.cardColors }}
    >
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
        Your Teams
      </Typography>

      {teams.map((team, index) => (
        <Card
          sx={{ mt: 2, maxHeight: "50%", maxWidth: "20vw", mb: 2 }}
          className="transition ease-in-out delay-50 hover:scale-105 duration-100"
          key={index}
        >
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
            <Button
              size="small"
              onClick={() => {
                handleOpen(team);
              }}
            >
              Leave Team
            </Button>
          </CardActions>
        </Card>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal_style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leaving Team
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to leave team: {selectedTeam.name}
          </Typography>
          <Button
            onClick={async () => {
              await handleLeave(selectedTeam);
              location.reload();
            }}
          >
            Leave
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TeamInfo;
