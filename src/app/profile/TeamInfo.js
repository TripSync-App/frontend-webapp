import React from "react";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Typography, Modal } from "@mui/material";
import { API_URL, modal_style } from "../constants";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  useTheme,
} from "@mui/material";

const TeamInfo = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("accessToken");
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
      await fetch(`${API_URL}/teams/remove-user`, {
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
      className="mt-4 mr-2 p-2 ml-auto h-[90vh] overflow-scroll min-w-[20vw]"
      style={{ backgroundColor: theme.palette.cardColors }}
    >
      <Typography>Your Teams</Typography>
      {teams.map((team, index) => (
        <Card
          sx={{ mt: 2, maxHeight: "50%", maxWidth: "20vw", mb: 2 }}
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
