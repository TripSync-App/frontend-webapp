"use client";
import React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CreateAccount from "./CreateAccount";
import Snackbar from "@mui/material/Snackbar";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../../public/TS_LOGO.png";
import "./styles.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, setCreateUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [severity, setSeverity] = useState("");

  const updateOpen = (state) => {
    setOpen(state);
  };

  const setSnackbarMessage = (message) => {
    setMessage(message);
  };

  const setSnackbarSeverity = (val) => {
    setSeverity(val);
  };

  const updateCreateUser = (val) => {
    setCreateUser(val);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setInvalid(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setInvalid(false);
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
        setInvalid(true);
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
      <div className="login flex flex-col bg-white/50 rounded w-[20%] h-[50%]">
        {createUser ? (
          <button
            className="w-[5%]"
            onClick={() => {
              setCreateUser(false);
            }}
          >
            <ArrowBackIcon
              className={"m-[1%] text-black hover:text-white"}
              sx={{ position: "relative", fontSize: "200%" }}
            />
          </button>
        ) : null}
        <div className="image-wrapper flex justify-center  w-[100%]">
          <Image src={logo} className="w-[60%]"></Image>
        </div>
        {createUser ? (
          <CreateAccount
            openSnackbar={setOpen}
            setSnackbarMessage={setMessage}
            setCreateUser={updateCreateUser}
            setSeverity={setSeverity}
          />
        ) : (
          <div className="form flex flex-row justify-center mb-[20%]">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                id="username-input"
                placeholder="Username"
                className="w-[100%] mb-[1vh] text-black border border-black rounded"
                type="text"
                name="username"
                onChange={handleUsernameChange}
              />
              <input
                id="password-input"
                className="w-[100%] text-black border border-black rounded"
                type="password"
                name="password"
                onChange={handlePasswordChange}
                placeholder="Password"
              />
              {invalid && username && password ? (
                <p className="mt-[0.5vh] p-[0.5%] text-white bg-red-500 rounded bold">
                  Invalid username or password
                </p>
              ) : null}
              <Button
                id="login-button"
                className={"bg-logoBlue"}
                type="submit"
                variant="contained"
                disabled={!(username && password)}
              >
                Login
              </Button>
              <div className="create-wrapper mt-[1vh]">
                <button
                  onClick={() => {
                    setCreateUser(true);
                  }}
                  className="text-center w-[100%]"
                >
                  <span className="p-[1%] text-center text-black hover:bg-logoBlue hover:text-white hover:rounded">
                    Create an account
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setOpen(false)}
          variant="filled"
          sx={{ width: "100%" }}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
