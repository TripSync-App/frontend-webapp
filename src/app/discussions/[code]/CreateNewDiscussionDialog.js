import React, { useState } from "react";
import { Box, useTheme } from "@mui/system";
import { Typography, TextField, Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const CreateNewDiscussionDialog = ({ vacation }) => {
  let token = "";
  try {
    localStorage.getItem("accessToken");
  } catch {}
  const [checked, setChecked] = useState([]);
  const [title, setTitle] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`/api/discussions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          members: checked,
          vacation: vacation.vacation_id,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row mr-4 ml-4 h-auto">
        <div
          id="mainContent"
          className="p-2 mr-4 mt-2 mb-2 w-[75%] h-full rounded-md"
          style={{ backgroundColor: theme.palette.hueShift }}
        >
          <TextField
            fullWidth
            label="Discussion Title"
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            margin="normal"
          />
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {vacation.members.map((member, value) => {
              return (
                <ListItem key={member.user_id} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
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
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateNewDiscussionDialog;
