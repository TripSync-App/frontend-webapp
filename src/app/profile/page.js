"use client";
import React from "react";
import TeamInfo from "./TeamInfo";
import UserInfo from "./UserInfo";
import RecentActivity from "./RecentActivity";
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
  // Default to light mode if preference is not specified
  const isDarkMode = prefersDarkMode || false;
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          customBackground: isDarkMode ? "#131414" : "#F5F5F5", // Lighter background for light mode
          customBackground: prefersDarkMode ? "#131414" : "#FFFFFF",
          cardColors: prefersDarkMode ? "#181a1c" : "#FFFFFF",
          // Add text colors for both modes
          text: {
            primary: isDarkMode ? "#FFFFFF" : "#000000",
            secondary: isDarkMode ? "#C0C0C0" : "#444444",
          },
        },
      }),
    [isDarkMode],
  );
  return (
    <main
      className="h-[100%] w-[100%]"
      style={{ backgroundColor: theme.palette.customBackground }}
    >
      <ThemeProvider theme={theme}>
        <NavBarComponent logo={logo} pos={"static"}></NavBarComponent>
        <div className="flex flex-row h-full overflow-hidden">
          <div className="animate-fade-right">
            <UserInfo></UserInfo>
          </div>
          <div className="flex flex-row ml-4 w-full">
            <RecentActivity></RecentActivity>
            <div className="animate-fade-left">
              <TeamInfo></TeamInfo>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Profile;
