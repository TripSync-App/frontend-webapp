"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import SelectTeam from "./SelectTeam";
import MemberInfo from "./MemberInfo";
import TeamInfo from "./TeamInfo";
import { createTeam, fetchTeams } from "./lib";
import NavBarComponent from "../components/NavBar";
import logo from "../resources/TS_LOGO.png";
import {
  ThemeProvider,
  useMediaQuery,
  createTheme,
  Divider,
  Paper,
} from "@mui/material";

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
              <Typography sx={{ paddingLeft: 2, paddingTop: 2 }}>
                Member Info
              </Typography>
              <MemberInfo members={members}></MemberInfo>
            </div>
          </Paper>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Team;
