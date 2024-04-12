"use client";
import NavBarComponent from "../../components/NavBar";
import logo from "../../resources/TS_LOGO.png";
import {
  ThemeProvider,
  useMediaQuery,
  createTheme,
  Box,
  List,
  ListItem,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import React, { useMemo, useEffect, useState } from "react";
import DiscussionCard from "./DiscussionCard";
import CreateNewDiscussionDialog from "./CreateNewDiscussionDialog";
import MemberBlock from "./MemberBlock";

export default function Discussions({ params }) {
  let [discussions, setDiscussions] = useState([]);
  let [adminUser, setAdminUser] = useState({});
  let [vacation, setVacation] = useState({});
  let [members, setMembers] = useState([]);
  const id = params.code;
  let token = "";
  let userData = "";

  const CreateDialog = (
    <CreateNewDiscussionDialog vacation={vacation}></CreateNewDiscussionDialog>
  );

  try {
    token = localStorage.getItem("accessToken");
    userData = JSON.parse(localStorage.getItem("userData"));
  } catch {}

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          customBackground: prefersDarkMode ? "#131414" : "#5ac465",
          textColor: prefersDarkMode ? "#FFFFFF" : "#000000",
          fontColor: prefersDarkMode ? "inherit" : "#000000",
          hueShift: prefersDarkMode
            ? "rgba(0, 0, 0, 0.25)"
            : "rgba(4, 118, 208, 0.75)",
          lighten: "rgba(255, 255, 255, 0.25)",
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
          setVacation(data);
          setDiscussions(data.discussions);
          setAdminUser(data.admin_user);
          setMembers(data.members);
          console.log(data);
        });
    } catch (err) {
      setDiscussions("Whoops, Something Went Wrong :(");
      console.log(err);
    }
  };

  const exportVacation = async () => {
    const body = {
      vacation: vacation.vacation_id,
    };
    try {
      // Using await to wait for the fetch call to complete
      const response = await fetch(`/api/vacations/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Assuming token is defined elsewhere
        },
        body: JSON.stringify(body),
      });
      // Again using await to wait for the blob
      const blob = await response.blob();
      // Create a new URL pointing to the blob object
      const url = window.URL.createObjectURL(blob);
      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = url;
      // Set the filename
      a.download = "export.csv";
      document.body.appendChild(a); // Append the anchor to body
      a.click(); // Trigger a click on the element
      a.remove(); // Clean up
      window.URL.revokeObjectURL(url); // Release the object URL
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getVacationInfo();
  }, []);

  return (
    <main id="discussion" className="overflow-hidden h-full">
      <ThemeProvider theme={theme}>
        <NavBarComponent logo={logo} pos="static" />
        <div className="flex flex-row h-full justify-between">
          <div id="left-bar" className="p-4 w-[50%] h-[100%]">
            <Box
              sx={{
                backgroundColor: theme.palette.customBackground,
                padding: 2,
              }}
              className="h-[90%]"
            >
              <Box
                id="vacation-information"
                sx={{
                  backgroundColor: theme.palette.customBackground,
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="rounded-md mb-2"
              >
                <Typography variant="h4">
                  Welcome to the {vacation.name} vacation!
                </Typography>
                <Button onClick={exportVacation}>Export</Button>
              </Box>
              <Divider className="!mb-2"></Divider>
              <Typography>Members in this vacation:</Typography>
              <List>
                {members &&
                  members.map((member) => {
                    return (
                      <MemberBlock
                        member={member}
                        key={member.user_id}
                      ></MemberBlock>
                    );
                  })}
              </List>
            </Box>
          </div>
          <div id="right-bar" className="w-[50%] h-[100%] p-4">
            <div
              id="discussionBoard"
              className="flex flex-col h-[90%] w-100"
              style={{ backgroundColor: theme.palette.customBackground }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.customBackground,
                  padding: 2,
                }}
                className="rounded-md h-[80%]"
              >
                <Typography className="pl-2 pr-2 pb-2">Discussions</Typography>
                {discussions.map((discussion, index) => (
                  <DiscussionCard
                    discussion={discussion}
                    key={index}
                  ></DiscussionCard>
                ))}
                {userData.username === adminUser.username ? (
                  <DiscussionCard
                    OverwrittenDialog={CreateDialog}
                  ></DiscussionCard>
                ) : null}
                <Box
                  sx={{
                    bgcolor: "theme.palette.customBackground",
                    color: theme.palette.text,
                    justifyContent: "center",
                    flex: "flex-grow",
                  }}
                ></Box>
              </Box>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
}
