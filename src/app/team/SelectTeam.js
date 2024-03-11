import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IconButton, Tooltip } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { createTeam, fetchTeams } from "./lib";
import CreateTeamModal from "./CreateTeamModal";

const SelectTeam = ({ teams, selectedTeam, onSelectTeam }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await fetchTeams();
        console.log(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="flex" sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Your Team</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTeam}
          onChange={(e) => {
            onSelectTeam(e.target.value);
          }}
        >
          {teams &&
            teams.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Tooltip title="Create New Team">
        <IconButton className="ml-[1vw]" onClick={handleOpen}>
          <AddCircleOutline fontSize="large" />
        </IconButton>
      </Tooltip>
      <CreateTeamModal open={open} handleClose={handleClose}></CreateTeamModal>
    </Box>
  );
};

export default SelectTeam;
