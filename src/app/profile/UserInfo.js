import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const UserInfo = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
  };

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Bio:", bio);
    console.log("Profile Picture:", profilePic);
    setName("");
    setBio("");
    setProfilePic("");
  };

  return (
    <Box
      className="flex flex-col p-4 justify-between rounded-lg m-auto"
      sx={{ boxShadow: 4, bgcolor: "background.default", mt: 2 }}
    >
      <div className="flex justify-center">
        <Avatar
          alt="Profile Picture"
          src={profilePic ? URL.createObjectURL(profilePic) : ""}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
      </div>
      <Typography variant="h5" gutterBottom align="center">
        @{userData.username}
      </Typography>
      <TextField
        label="First Name"
        variant="outlined"
        value={userData.first_name}
        onChange={handleNameChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        value={userData.last_name}
        onChange={handleNameChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <input
        accept="image/*"
        id="profile-pic-upload"
        type="file"
        onChange={handleProfilePicChange}
        style={{ display: "none" }}
      />
      <label htmlFor="profile-pic-upload">
        <Button sx={{ mb: 2 }} variant="outlined" component="span" fullWidth>
          Upload Profile Picture
        </Button>
      </label>
      <Button
        className="bg-white"
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >
        Apply Changes
      </Button>
    </Box>
  );
};

export default UserInfo;
