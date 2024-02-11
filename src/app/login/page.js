"use client";
import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import logo from "../../../public/TS_LOGO.png";
import "../styles.css";

import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("http://localhost:8000/login", options);
      if (response.status === 200) {
        const result = await response.json();
        sessionStorage.setItem("accessToken", result.access_token);
        router.push("/");
      } else {
        console.error("Response status:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="login-wrapper"
      className="login-wrapper flex justify-center absolute  min-h-[100vh] min-w-[100vw]"
    >
      <div className="login flex flex-col justify-center bg-white/75 rounded w-[20%] h-[50%]">
        <div className="image-wrapper flex justify-center  w-[100%]">
          <Image src={logo} className="w-[20vw]"></Image>
        </div>
        <div className="form flex flex-row justify-center mb-[20%]">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              className="w-[100%] mb-[1vh] text-black border border-black"
              type="text"
              name="username"
              onChange={handleUsernameChange}
            />
            <input
              className="w-[100%] text-black border border-black"
              type="password"
              name="password"
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <Button
              id="login-button"
              className={"mt-[1vh] bg-logoBlue"}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
