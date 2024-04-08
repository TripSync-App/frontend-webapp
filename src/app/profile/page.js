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

  // Define colors for both light and dark mode
  const lightModeColors = {
    customBackground: "",
    cardColors: "",
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },
  };

  const darkModeColors = {
    customBackground: "#",
    cardColors: "rgba(0 ,0 ,0 , 0.25)",
    text: {
      primary: "#FFFFFF",
      secondary: "#C0C0C0",
    },
  };

  // Create theme based on the mode and colors
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      ...(isDarkMode ? darkModeColors : lightModeColors), // Corrected spread syntax
      secondaryColor: prefersDarkMode ? "grey" : "#grey",
    },
  });

  return (
    <main
      className="h-[100%] w-[100%]"
      style={{
        backgroundColor: isDarkMode
          ? darkModeColors.customBackground
          : lightModeColors.customBackground,
      }}
    >
      <ThemeProvider theme={theme}>
        <NavBarComponent logo={logo} pos={"static"}></NavBarComponent>
        <div className="flex flex-row max-sm:flex-col h-full overflow-hidden">
          <div className="animate-fade-right">
            <UserInfo></UserInfo>
          </div>
          <div className="flex flex-row max-sm:flex-col max-sm:ml-0 ml-4 w-full">
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
