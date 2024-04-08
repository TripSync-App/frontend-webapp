import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, useTheme, Alert } from "@mui/material";
import { createTeam } from "./lib";
import { useState } from "react";

export default function CreateTeamModal({ open, handleClose }) {
  let token = "";
  try {
    token = localStorage.getItem("accessToken");
  } catch {}

  const theme = useTheme();
  const [error, setError] = useState("");

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
      const result = await createTeam(teamName, token);
      const status = result.status;
      const data = result.data;
      console.log(`STATUS: ${status}`);
      if (status === 200) {
        handleClose();
        location.reload();
      } else if (status === 403) {
        setError("You can't create a team with the same name!");
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
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: theme.palette.fontColor }}
          >
            Create a New Team
          </Typography>
          <div className="flex flex-col">
            <div className="flex align-middle">
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
                className="!ml-[1vw] !mt-[1vh]"
                variant="contained"
                size="small"
                onClick={handleTeamCreate}
                sx={{
                  backgroundColor: (theme) =>
                    `${theme.palette.secondaryColor} !important`,
                  color: theme.palette.fontColor,
                }}
              >
                Create
              </Button>
            </div>
            <Button
              sx={{
                backgroundColor: (theme) =>
                  `${theme.palette.secondaryColor} !important`,
                color: theme.palette.fontColor,
              }}
              className="!mt-[1vh] max-w-10"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
