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
          customBackground: prefersDarkMode ? "rgba(0, 0, 0, 0.75)" : "#5ac465",
          textColor: prefersDarkMode ? "#FFFFFF" : "#000000",
          fontColor: prefersDarkMode ? "inherit" : "#000000",
          hueShift: prefersDarkMode
            ? "rgba(0, 0, 0, 0.25)"
            : "rgba(4, 118, 208, 0.75)",
          lighten: "rgba(255, 255, 255, 0.25)",
        },
        typography: {
          fontFamily: ["Outfit", "sans-serif"].join(","),
          h3: {
            fontSize: "2.25rem", // Default font size for h3
            "@media (max-width:600px)": {
              fontSize: "1.5rem", // Smaller font size on small screens
            },
          },
          h5: {
            fontSize: "1.5rem",
            "@media (max-width:600px)": {
              fontSize: "1.25rem",
            },
          },
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
      const response = await fetch(`/api/vacations/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      a.download = "export.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getVacationInfo();
  }, []);

  return (
    <main id="discussion" className="h-full overflow-scroll">
      <ThemeProvider theme={theme}>
        <NavBarComponent logo={logo} pos="static" />
        <div className="flex flex-row h-full justify-between max-sm:flex-col">
          <div
            id="left-bar"
            className="p-4 w-[50%] h-[100%] max-sm:w-[100%] max-sm:pb-0"
          >
            <Box
              sx={{
                backgroundColor: theme.palette.customBackground,
                padding: 2,
              }}
              className="h-[90%] max-sm:h-[100%]"
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
                <Typography variant="h3" className="font-passion">
                  Welcome to the {vacation.name} vacation!
                </Typography>
                <Button onClick={exportVacation}>Export</Button>
              </Box>
              <Divider className="!mb-2"></Divider>
              <Typography className="font-bold" variant="h5">
                Members
              </Typography>
              <List>
                {vacation.admin_user && (
                  <div>
                    <MemberBlock
                      member={vacation.admin_user}
                      isAdmin={true}
                    ></MemberBlock>
                  </div>
                )}
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
          <div id="right-bar" className="w-[50%] h-[100%] p-4 max-sm:w-[100%]">
            <div
              id="discussionBoard"
              className="flex flex-col h-[90%] w-100 max-sm:h-[100%]"
              style={{ backgroundColor: theme.palette.customBackground }}
            >
              <Box
                sx={{
                  padding: 2,
                }}
                className="rounded-md h-[80%] max-sm:h-[100%]"
              >
                <Typography className="pl-2 pr-2 pb-2 font-bold" variant="h5">
                  Discussions
                </Typography>
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
