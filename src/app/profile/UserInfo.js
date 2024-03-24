import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { API_URL } from "../constants";

const UserInfo = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [newPFP, setNewPFP] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("accessToken");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setNewPFP(file);
  };

  const handleSubmit = async () => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("image", newPFP);

    try {
      const response = await fetch(`${API_URL}/users/upload-pfp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Profile picture uploaded successfully");
      } else {
        console.error("Error uploading profile picture:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
    }
  };

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await fetch(`${API_URL}/users/pfp`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.blob();
          const imageUrl = URL.createObjectURL(data);
          setProfilePic(imageUrl);
        } else {
          console.error("Error fetching profile picture:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error.message);
      }
    };

    fetchProfilePic();
  }, []);

  return (
    <Box
      className="flex flex-col p-4 justify-between rounded-lg ml-2 h-full max-w-[20vw]"
      sx={{ boxShadow: 4, bgcolor: "background.default", mt: 2 }}
    >
      <div className="flex justify-center">
        <Avatar
          alt="Profile Picture"
          src={newPFP ? URL.createObjectURL(newPFP) : profilePic}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
      </div>
      <Typography variant="h5" gutterBottom align="center">
        @{userData.username}
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          type="submit"
          className="bg-white"
          variant="contained"
          fullWidth
        >
          Apply Changes
        </Button>
      </form>
    </Box>
  );
};

export default UserInfo;
