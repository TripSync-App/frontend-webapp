import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { createTeam } from "./lib";
import { useState } from "react";
import { deleteUser } from "./lib";

export default function DeleteUserModal({ open, handleClose, user, team }) {
  const handleDeleteUser = async () => {
    await deleteUser(user, team.team_id);
    location.reload();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to remove this user?
          </Typography>
          <div className="flex flex-col">
            <div className="flex">
              <Button
                className="!ml-[1vw]"
                variant="contained"
                size="small"
                onClick={handleDeleteUser}
              >
                Yes
              </Button>
            </div>
            <Button className="!mt-[1vh] max-w-10" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
