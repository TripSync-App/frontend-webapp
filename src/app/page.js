"use client";
import ButtonComponent from "./components/Button";
import Banner from "./components/Banner";
import NavBarComponent from "./components/NavBar";
import "./styles.css";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, useMediaQuery, createTheme, Divider } from "@mui/material";
import logo from './resources/TS_LOGO.png'
import FilterBox from "./components/FilterBox";
import Thumbnail from "./components/Thumbnail";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
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

  return (
    <div className="main">
      {!loading ? (
        <main className="min-h-screen items-center p-24">
          <ThemeProvider theme={theme}>
          <NavBarComponent logo={logo}></NavBarComponent>
          <FilterBox/>
          <Thumbnail styling={{width: 350}} title={"Test"} image={logo} description={"This is a test Thumbnail"} />
          </ThemeProvider>
        </main>
      ) : (
        <></>
      )}
    </div>
  );
}
