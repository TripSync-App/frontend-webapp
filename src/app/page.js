"use client";
import ButtonComponent from "./components/Button";
import Banner from "./components/Banner";
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
import Thumbnail from "./components/Thumbnail";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

  // useEffect(() => {
  //   const authToken = localStorage.getItem("accessToken");
  //   if (!authToken) {
  //     router.push("/login");
  //   } else {
  //     setLoading(true);
  //   }
  // }, [router]);

  function openPage(url){
    console.log(`${url}`);
  }

  let thumbnailImages = [
    {
      title: "City Sights",
      image: nightSample,
      description: "#NightLife",
      styling: { bgcolor: "black" },
      tags: []
    },
    {
      title: "Wilderness",
      image: adventureSample,
      description: "A Fresh Breath of Air",
      styling: { bgcolor: "darkgreen" },
      tags: []
    },
    {
      title: "Ocean View",
      image: beachSample,
      description: "Surf's Up!",
      styling: { bgcolor: "teal" },
      tags: []
    },
    {
      title: "Attractions",
      image: festvalSample,
      description: "Fun For the Whole Family",
      styling: { bgcolor: "purple" },
      tags: []
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
              {thumbnailImages.map(function (thumbnail) {
                return (
                  <Thumbnail
                    key={thumbnailImages.indexOf(thumbnail)}
                    styling={thumbnail.styling}
                    title={thumbnail.title}
                    image={thumbnail.image}
                    description={thumbnail.description}
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
