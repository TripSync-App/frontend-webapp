import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CreateAccount = ({ openSnackbar, setSnackbarMessage, setCreateUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleChange = (e, callable) => {
    callable(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("http://localhost:8000/users", options);
      if (response.status === 200) {
        const result = await response.json();
        setCreateUser(false);
        openSnackbar(true);
        setSnackbarMessage("Wow you made an account!");
      } else {
        console.error("Response status:", response.status);
        setCreateUser(false);
        openSnackbar(true);
        setSnackbarMessage("Username already taken!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form flex flex-row justify-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="name flex justify-center space-x-4 w-[100%]">
          <TextField
            className={"mb-[1vh] w-[45%]"}
            label="First Name"
            variant="filled"
            onChange={(e) => handleChange(e, setFirstName)}
            required
          ></TextField>
          <TextField
            className={"mb-[1vh] w-[45%]"}
            label="Last Name"
            variant="filled"
            onChange={(e) => handleChange(e, setLastName)}
            required
          ></TextField>
        </div>
        <div className="account flex justify-center space-x-4 w-[100%]">
          <TextField
            className={"mt-[1vh] mb-[1vh] w-[45%]"}
            label="Username"
            variant="filled"
            onChange={(e) => handleChange(e, setUsername)}
            required
          ></TextField>
          <TextField
            className={"mt-[1vh] mb-[1vh] w-[45%]"}
            label="Password"
            type="password"
            variant="filled"
            onChange={(e) => handleChange(e, setPassword)}
            required
          ></TextField>
        </div>
        <div className="button-wrapper flex justify-center">
          <Button
            id="login-button"
            className={"mt-[1vh] bg-logoBlue w-[50%]"}
            type="submit"
            variant="contained"
            disabled={!(firstName && lastName && username && password)}
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
