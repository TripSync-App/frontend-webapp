"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Box, Icon, IconButton, Tooltip, Typography } from "@mui/material";
import SelectTeam from "./SelectTeam";
import MemberInfo from "./MemberInfo";
import TeamInfo from "./TeamInfo";
import { createTeam, fetchTeams, createInviteCode, getInviteCode } from "./lib";
import NavBarComponent from "../components/NavBar";
import logo from "../resources/TS_LOGO.png";
import {
  ThemeProvider,
  useMediaQuery,
  createTheme,
  Divider,
  Paper,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");
  const [members, setMembers] = useState([]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectTeam = (selectedTeam) => {
    setTeam(selectedTeam);
    setMembers(selectedTeam.members);
  };

  const handleCreateTeam = () => {
    createTeam();
  };

  const getInviteLink = async () => {
    await createInviteCode(team.team_id);
    const res = await getInviteCode(team.team_id);
    const link = res.invite_link;
    await navigator.clipboard.writeText(link);
  };

  return (
    <main className="">
      <ThemeProvider theme={theme}>
        <NavBarComponent logo={logo} pos={"static"}></NavBarComponent>
        <div
          id="team-wrapper"
          className="team flex justify-center min-h-[100vh] min-w-[100vw]"
        >
          <Paper className="mt-[1vh] h-[75%] w-[95%]">
            <Box sx={{ width: "100%", padding: 2 }}>
              <SelectTeam
                teams={teams}
                selectedTeam={team}
                onSelectTeam={handleSelectTeam}
                onCreateTeam={handleCreateTeam}
              />
            </Box>
            <div className="info flex flex-col justify-between">
              <Typography sx={{ paddingLeft: 2 }}>Team Info</Typography>
              <TeamInfo item={team}></TeamInfo>
              <Divider />
              <div className="flex flex-row">
                <Typography sx={{ paddingLeft: 2, paddingTop: 2 }}>
                  Member Info
                </Typography>
                <Tooltip title="Copy Invite Link">
                  <IconButton onClick={getInviteLink}>
                    <ContentCopy>Copy Invite Code</ContentCopy>
                  </IconButton>
                </Tooltip>
              </div>
              <MemberInfo team={team} members={members}></MemberInfo>
            </div>
          </Paper>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Team;
