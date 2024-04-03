import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  Modal,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Delete } from "@mui/icons-material";
import { modal_style } from "../constants";
import { deleteAccount } from "../team/lib";
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState("");
  const [newPFP, setNewPFP] = useState("");
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [first, setFirst] = useState(userData.first_name);
  const [last, setLast] = useState(userData.last_name);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteSelf = async () => {
    setOpen(false);
    deleteAccount();
    await new Promise((resolve) =>
      router.push("/login", undefined, { shallow: true }, resolve),
    );
    localStorage.clear();
  };

  const token = localStorage.getItem("accessToken");
  const theme = useTheme();

  const handleFirstChange = (event) => {
    setFirst(event.target.value);
  };

  const handleLastChange = (event) => {
    setLast(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setNewPFP(file);
  };

  const handleSubmit = async () => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("image", newPFP);
    console.log(first);
    console.log(last);
    formData.append("first_name", first);
    formData.append("last_name", last);

    try {
      const response = await fetch(`/api/users/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Profile picture uploaded successfully");
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, first_name: first, last_name: last }),
        );
        location.reload();
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
        const response = await fetch(`/api/users/pfp`, {
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
      className="h-[90vh] flex flex-col p-4 rounded-lg ml-2 max-w-[20vw]"
      style={{ backgroundColor: theme.palette.cardColors }}
      sx={{ boxShadow: 4, mt: 2, position: "relative" }}
    >
      <Tooltip title="Delete Your Account">
        <IconButton
          onClick={handleOpen}
          sx={{ position: "absolute", right: 0, top: -1, mb: 2 }}
        >
          <Delete></Delete>
        </IconButton>
      </Tooltip>
      <div className="flex justify-center h-[25%]">
        <Avatar
          alt="Profile Picture"
          src={newPFP ? URL.createObjectURL(newPFP) : profilePic}
          sx={{
            width: "auto",
            height: "95%",
            aspectRatio: "1/1",
            mb: 2,
            boxShadow: 2,
          }}
        />
      </div>
      <Typography sx={{ mb: 2 }} variant="h5" gutterBottom align="center">
        @{userData.username}
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="First Name"
          variant="outlined"
          value={first}
          onChange={handleFirstChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={last}
          onChange={handleLastChange}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal_style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leaving Team
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete your account? This can NOT be
            undone.
          </Typography>
          <Button onClick={deleteSelf}>Delete My Account</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserInfo;
