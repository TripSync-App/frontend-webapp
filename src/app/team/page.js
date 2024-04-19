"use client";
import React, { useEffect, useState, useMemo, memo } from "react";
import { Box, Icon, IconButton, Tooltip, Typography } from "@mui/material";
import SelectTeam from "./SelectTeam";
import MemberInfo from "./MemberInfo";
import TeamInfo from "./TeamInfo";
import {
  createTeam,
  fetchTeams,
  createInviteCode,
  getInviteCode,
  deleteTeam,
} from "./lib";
import NavBarComponent from "../components/NavBar";
import logo from "../resources/TS_LOGO.png";
import {
  Modal,
  ThemeProvider,
  useMediaQuery,
  createTheme,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import { ContentCopy, Delete } from "@mui/icons-material";
import { modal_style } from "../constants";

//TODO: delete team button

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  let token = "";
  try {
    token = localStorage.getItem("accessToken");
  } catch (e) {}

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteTeam(team.team_id, token);
    window.location.reload();
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ["Outfit", "sans-serif"].join(","),
        },
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: prefersDarkMode ? "#90caf9" : "#1976d2", // Adjust primary color for light and dark mode
          },
          background: {
            default: prefersDarkMode ? "#121212" : "#f5f5f5", // Adjust background color for light and dark mode
          },
          fontColor: prefersDarkMode ? "inherit" : "black",
        },
      }),
    [prefersDarkMode],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await fetchTeams(token);
        setTeams(teamsData.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleSelectTeam = (selectedTeam) => {
    setTeam(selectedTeam);
    setMembers(selectedTeam.members);
  };

  const handleCreateTeam = () => {
    createTeam();
  };

  const getInviteLink = async () => {
    await createInviteCode(team.team_id, token);
    const res = await getInviteCode(team.team_id, token);
    const link = res.invite_link;
    await navigator.clipboard.writeText(link);
  };

  return (
    <main className="">
      <ThemeProvider theme={theme}>
        <NavBarComponent logo={logo} pos={"static"}></NavBarComponent>
        <div
          id="team-wrapper"
          className="team flex justify-center min-w-[100vw]"
          style={{ backgroundColor: theme.palette.customBackground }}
        >
          <Paper
            sx={{ backgroundColor: theme.palette.customComponentBackground }}
            className="mt-[1vh] h-[75%] w-full ml-2 mr-2 animate-fade-down"
          >
            <Box sx={{ width: "100%", padding: 2 }}>
              <SelectTeam
                teams={teams}
                selectedTeam={team}
                onSelectTeam={handleSelectTeam}
                onCreateTeam={handleCreateTeam}
              />
            </Box>
            <div className="info flex flex-col justify-between">
              <div className="flex flex-row items-center">
                <Typography
                  className="text-lg font-bold"
                  sx={{ pl: 2 }} // Use MUI's sx prop for padding left
                >
                  Team Info
                </Typography>
                {team ? (
                  <Tooltip title="Delete your team">
                    <IconButton onClick={handleOpen} className="p-0">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </div>
              <TeamInfo key={team.team_id} item={team}></TeamInfo>
              <Divider />
              <div className="flex flex-row">
                <Typography
                  sx={{ paddingLeft: 2, paddingTop: 2 }}
                  className="!text-lg !font-bold"
                >
                  Member Info
                </Typography>
                {team ? (
                  <div className="pl-2 pt-2">
                    <Tooltip title="Copy Invite Link">
                      <IconButton onClick={getInviteLink}>
                        <ContentCopy>Copy Invite Code</ContentCopy>
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : null}
              </div>
              <MemberInfo
                team={team}
                members={members}
                styling={{
                  backgroundColor: theme.palette.customComponentBackground,
                }}
              ></MemberInfo>
            </div>
          </Paper>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modal_style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="font-bold"
                sx={{ color: theme.palette.fontColor }}
              >
                Deleting Team
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 1, color: theme.palette.fontColor }}
              >
                Are you sure you want to delete your team? This can NOT be
                undone.
              </Typography>
              <Button
                onClick={handleDelete}
                sx={{
                  backgroundColor: "red !important",
                  color: theme.palette.fontColor,
                  mr: 1,
                  mt: 1,
                }}
              >
                Delete My Team
              </Button>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: (theme) =>
                    `${theme.palette.secondaryColor} !important`,
                  color: theme.palette.fontColor,
                  mr: 1,
                  mt: 1,
                }}
              >
                Close
              </Button>
            </Box>
          </Modal>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Team;
