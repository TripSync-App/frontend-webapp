import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleChange = (e, callable) => {
    callable(e.target.value);
  };

  const handleSubmit = () => { };

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
