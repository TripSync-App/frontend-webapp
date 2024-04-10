import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/system";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { fetchTeams } from "@/app/team/lib";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const CreateNewVacationDialog = () => {
  let token = "";

  try {
    token = localStorage.getItem("accessToken");
  } catch {}

  const [checked, setChecked] = useState([]);
  const [title, setTitle] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [members, setMembers] = useState([]);
  const theme = useTheme();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSelectTeam = (selectedTeam) => {
    setSelectedTeam(selectedTeam);
    setMembers(selectedTeam.members);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`/api/vacations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vacation: title,
          team: selectedTeam.team_id,
          members: checked,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    const getTeams = async () => {
      let fetchedTeams = await fetchTeams(token);
      setTeams(fetchedTeams.teams);
    };
    getTeams();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row mr-4 ml-4 h-auto">
        <div
          id="mainContent"
          className="flex flex-row p-2 mt-2 mb-2 h-full rounded-md"
          style={{ backgroundColor: theme.palette.hueShift }}
        >
          <div id="selectors" className="w-full">
            <TextField
              fullWidth
              label="Vacation Title"
              value={title}
              onChange={handleTitleChange}
              variant="outlined"
              margin="normal"
            />

            <Select // Select your team
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              aria-label="Select your Team"
              value={selectedTeam}
              className="w-full"
              sx={{ color: theme.palette.fontColor }}
              onChange={(e) => {
                handleSelectTeam(e.target.value);
              }}
            >
              {teams
                ? teams.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
            {selectedTeam && title ? ( // fill out both
              <button className="mt-2" type="submit">
                Submit
              </button>
            ) : null}
          </div>
          {members.length > 0 ? (
            <List sx={{ width: "100%", ml: 2, bgcolor: "background.paper" }}>
              {members.map((member) => {
                return (
                  <ListItem key={member.user_id} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(member.user_id)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(member.user_id) !== -1}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${member.first_name} ${member.last_name}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default CreateNewVacationDialog;
