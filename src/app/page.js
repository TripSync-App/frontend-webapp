"use client";
import NavBarComponent from "./components/NavBar";
import "./styles.css";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ThemeProvider,
  useMediaQuery,
  createTheme,
  Divider,
} from "@mui/material";
import logo from "./resources/TS_LOGO.png";
import nightSample from "./resources/nightcity_scene.webp";
import adventureSample from "./resources/adventure_scene.webp";
import beachSample from "./resources/beach_scene.webp";
import festvalSample from "./resources/festival_scene.webp";
import FilterBox from "./components/FilterBox";
import ThumbNail from "./components/Thumbnail";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: prefersDarkMode ? '#90caf9' : '#1976d2', // Adjust primary color for light and dark mode
          },
          background: {
            default: prefersDarkMode ? '#121212' : '#f5f5f5', // Adjust background color for light and dark mode
          },
        },
      }),
    [prefersDarkMode],
  );

  // useEffect(() => {
  //   const authToken = localStorage.getItem("accessToken");
  //   if (!authToken) {
  //     router.push("/login");
  //   } else {
  //     setLoading(true);
  //   }
  // }, [router]);


  let vacationList = [
    {
      title: "City Sights",
      image: nightSample,
      description: "#NightLife",
      styling: { bgcolor: prefersDarkMode ? "black" : "#000000", color: prefersDarkMode ? 'inherit' : '#FFFFFF' }, // Adjust bgcolor and text color for light and dark mode
      tags: [],
      discussionId: 1
    },
    {
      title: "Wilderness",
      image: adventureSample,
      description: "A Fresh Breath of Air",
      styling: { bgcolor: prefersDarkMode ? "darkgreen" : "#013220", color: prefersDarkMode ? 'inherit' : '#FFFFFF' }, // Adjust bgcolor and text color for light and dark mode
      tags: [],
      discussionId: 2
    },
    {
      title: "Ocean View",
      image: beachSample,
      description: "Surf's Up!",
      styling: { bgcolor: prefersDarkMode ? "teal" : "#A7C7E7", color: prefersDarkMode ? 'inherit' : '#FFFFFF' }, // Adjust bgcolor and text color for light and dark mode
      tags: [],
      discussionId: 3
    },
    {
      title: "Attractions",
      image: festvalSample,
      description: "Fun For the Whole Family",
      styling: { bgcolor: prefersDarkMode ? "purple" : "#483248", color: prefersDarkMode ? 'inherit' : '#FFFFFF' }, // Adjust bgcolor and text color for light and dark mode
      tags: [],
      discussionId: 4
    },
  ];

  return (
    <div className="main ">
      {!loading ? (
        <main className="min-h-screen items-center p-24">
          <ThemeProvider theme={theme}>
            <NavBarComponent logo={logo} pos="fixed"></NavBarComponent>
            <FilterBox />
            <div className="flex flex-wrap">
              {vacationList.map(function (vacation) {
                return (
                  <ThumbNail
                    key={vacationList.indexOf(vacation)}
                    styling={vacation.styling}
                    title={vacation.title}
                    image={vacation.image}
                    description={vacation.description}
                    discussionId={vacation.discussionId}
                  />
                );
              })}
            </div>
          </ThemeProvider>
        </main>
      ) : (
        <></>
      )}
    </div>
  );
}
