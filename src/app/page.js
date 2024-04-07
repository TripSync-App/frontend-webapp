"use client";
import NavBarComponent from "./components/NavBar";
import "./styles.css";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ThemeProvider,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import logo from "./resources/TS_LOGO.png";
import FilterBox from "./components/FilterBox";
import ThumbNail from "./components/Thumbnail";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
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

  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      router.push("/login");
    } else {
      setLoading(true);
      const getThumbnails = async () => {
        try{
          let result = await fetch(`/api/vacations`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          })
          if (result.ok) {
            const data = await result.json()
            setThumbnails(data)
          }
        } catch (error){
          console.log("Fetch error: ", error)
        }
      }
      getThumbnails();
    }
  }, [router]);

  return (
    <div className="main ">
      {loading ? (
        <main className="min-h-screen items-center p-24">
          <ThemeProvider theme={theme}>
            <NavBarComponent logo={logo} pos="fixed"></NavBarComponent>
            <FilterBox />
            <div className="flex flex-wrap">
              {thumbnails.map(function (vacation) {

                // Set Description Default
                if (!("description" in vacation)){
                  vacation['description'] = "Description not provided";
                }

                // Set Style Default
                if ("styling" in vacation){
                  vacation.styling["color"] = prefersDarkMode ? 'inherit' : '#FFFFFF';
                } else {
                  vacation.styling = {};
                }
                return (
                  <ThumbNail
                    key={thumbnails.indexOf(vacation)}
                    styling={vacation.styling}
                    title={vacation.name}
                    image={vacation.image}
                    description={vacation.description}
                    vacationId={vacation.vacation_id}
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
