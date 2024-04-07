"use client";
import { API_URL } from "@/app/constants";
import NavBarComponent from "../../components/NavBar";
import logo from "../../resources/TS_LOGO.png";
import {
  ThemeProvider,
  useMediaQuery,
  createTheme,
  Divider,
  Paper,
  Box,
  Container,
  Typography,
  List,
} from "@mui/material";
import React, { useMemo, useEffect, useState } from "react";

export default function Discussions({ params }) {
  let [vacationInfo, setInfo] = useState(null);
  const id = params.code;
  const token = localStorage.getItem("accessToken");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          customBackground: prefersDarkMode ? "#131414" : "#5ac465",
          text: prefersDarkMode ? "#FFFFFF" : "#000000",
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
      }).then((response) => {
        console.log(response)
        if (response.ok) {
          let vacation = response.json()
          setInfo(vacation.discussions);
        } else {
          throw response.status;
        }
      });
    } catch (err) {
      setInfo("Whoops, Something Went Wrong :(");
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
          className="flex justify-center"
          style={{ backgroundColor: theme.palette.customBackground }}
        >
          <Box
            sx={{
              bgcolor: "theme.palette.customBackground",
              color: theme.palette.text,
              justifyContent: "center",
              flex: "flex-grow",
            }}
          >
            <Typography variant="h2" gutterBottom>
              {vacationInfo}
            </Typography>
            <List>
              {}
            </List>
          </Box>
        </div>
      </ThemeProvider>
    </main>
  );
}
