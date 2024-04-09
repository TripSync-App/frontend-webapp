"use client";
import NavBarComponent from "../../components/NavBar";
import logo from "../../resources/TS_LOGO.png";
import { ThemeProvider, useMediaQuery, createTheme, Box } from "@mui/material";
import React, { useMemo, useEffect, useState } from "react";
import DiscussionCard from "./DiscussionCard";

export default function Discussions({ params }) {
  let [discussions, setDiscussions] = useState([]);
  const id = params.code;
  let token = "";
  try {
    token = localStorage.getItem("accessToken");
  } catch {}
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          customBackground: prefersDarkMode ? "#131414" : "#5ac465",
          text: prefersDarkMode ? "#FFFFFF" : "#000000",
          fontColor: prefersDarkMode ? "inherit" : "#000000",
          hueShift: prefersDarkMode
            ? "rgba(0, 0, 0, 0.25)"
            : "rgba(4, 118, 208, 0.75)",
          lighten: "rgba(255, 255, 255, 0.5)",
        },
      }),
    [prefersDarkMode],
  );

  const getVacationInfo = async () => {
    try {
      await fetch(`/api/vacations/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDiscussions(data.discussions);
          console.log(data.discussions);
        });
    } catch (err) {
      setDiscussions("Whoops, Something Went Wrong :(");
      console.log(err);
    }
  };

  useEffect(() => {
    getVacationInfo();
  }, []);

  return (
    <main id="discussion" className="overflow-hidden min-h-screen">
      <ThemeProvider theme={theme}>
        <NavBarComponent logo={logo} pos="static" />
        <div
          id="discussionBoard"
          className="flex flex-col justify-center h-100 w-100"
          style={{ backgroundColor: theme.palette.customBackground }}
        >
          {discussions.map((discussion, index) => (
            <DiscussionCard
              discussion={discussion}
              key={index}
            ></DiscussionCard>
          ))}
          <Box
            sx={{
              bgcolor: "theme.palette.customBackground",
              color: theme.palette.text,
              justifyContent: "center",
              flex: "flex-grow",
            }}
          ></Box>
        </div>
      </ThemeProvider>
    </main>
  );
}
