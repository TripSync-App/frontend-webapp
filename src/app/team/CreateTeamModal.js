import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { createTeam } from "./lib";
import { useState } from "react";

export default function CreateTeamModal({ open, handleClose }) {
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

  const [teamName, setTeamName] = useState("");

  const handleTeamCreate = async () => {
    try {
      const result = await createTeam(teamName);
      const status = result.status;
      const data = result.data;
      console.log(`STATUS: ${status}`);
      if (status === 200) {
        handleClose();
        location.reload();
      } else if (status === 403) {
        console.error("Can't do that");
      }
    } catch (error) {
      console.error("Failed to create team:", error);
    }
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
            Create a New Team
          </Typography>
          <div className="flex flex-col">
            <div className="flex">
              <TextField
                className="!mt-[1vh]"
                label="Team Name"
                variant="outlined"
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                }}
              ></TextField>
              <Button
                className="!ml-[1vw]"
                variant="contained"
                size="small"
                onClick={handleTeamCreate}
              >
                Create
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
