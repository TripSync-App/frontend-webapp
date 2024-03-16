"use client";
import { API_URL } from "@/app/constants";
import { ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useMediaQuery, createTheme } from "@mui/material";
import Failure from "./Failure";
import Success from "./Success";
import "./style.css";
import { useRouter } from "next/navigation"; // Import useRouter hook

function InvitePage({ params }) {
  const inviteCode = params.code;
  const router = useRouter(); // Initialize useRouter hook
  const token = localStorage.getItem("accessToken");
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const redeemInvite = async () => {
      try {
        const response = await fetch(`${API_URL}/teams/redeem-invite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ code: inviteCode }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.status);
      } catch (error) {
        setError(error.message);
      }
    };

    redeemInvite();
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, [inviteCode, router, token]);

  return (
    <main className="w-[100vw] h-[100vh]">
      <ThemeProvider theme={theme}>
        {error ? (
          <div>
            <Failure></Failure>
          </div>
        ) : (
          <Success></Success>
        )}
      </ThemeProvider>
    </main>
  );
}

export default InvitePage;
