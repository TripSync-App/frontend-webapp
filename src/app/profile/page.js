"use client";
import React from "react";
import UserPreview from "./UserPreview";
import TeamInfo from "./TeamInfo";
import UserInfo from "./UserInfo";
import NavBarComponent from "../components/NavBar";
import { useEffect, useState, useMemo } from "react";
import {
  ThemeProvider,
  useMediaQuery,
  createTheme,
  Divider,
  Paper,
} from "@mui/material";
import logo from "../resources/TS_LOGO.png";

const Profile = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          customBackground: prefersDarkMode ? "#131414" : "#FFFFFF",
          cardColors: prefersDarkMode ? "#181a1c" : "#FFFFFF",
        },
      }),
    [prefersDarkMode],
  );
  return (
    <main
      className="h-[100%] w-[100%]"
      style={{ backgroundColor: theme.palette.customBackground }}
    >
      <ThemeProvider theme={theme}>
        <NavBarComponent logo={logo} pos={"static"}></NavBarComponent>
        <div className="flex flex-row h-full">
          <UserInfo></UserInfo>
          <div className="flex flex-row ml-4 w-full">
            <TeamInfo></TeamInfo>
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Profile;
