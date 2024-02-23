"use client";
import ButtonComponent from "./components/Button";
import Banner from "./components/Banner";
import NavBarComponent from "./components/NavBar";
import "./styles.css";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, useMediaQuery, createTheme } from "@mui/material";
import logo from './resources/TS_LOGO.png'


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
          <Banner className="Banner" />
          <ButtonComponent className="Button" />
          </ThemeProvider>
        </main>
      ) : (
        <></>
      )}
    </div>
  );
}
