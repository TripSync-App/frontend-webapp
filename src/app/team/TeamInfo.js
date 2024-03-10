import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const TeamInfo = ({ item }) => {
  useEffect(() => {
    console.log(item);
  }, [item]);
  return (
    <Box sx={{ padding: 2 }}>
      {item ? (
        <div className="flex space-x-4">
          <TextField
            label="Name"
            defaultValue={item.name}
            inputProps={{ readOnly: true }}
          ></TextField>
          <TextField
            label="Member Count"
            defaultValue={item.members.length}
            inputProps={{ readOnly: true }}
          ></TextField>
          <TextField
            label="Vacation Count"
            defaultValue={item.vacations.length}
            inputProps={{ readOnly: true }}
          ></TextField>
          <TextField
            label="Discussion Count"
            defaultValue={item.vacations.length}
            inputProps={{ readOnly: true }}
          ></TextField>
        </div>
      ) : (
        <h1>No member info available</h1>
      )}
    </Box>
  );
};

export default TeamInfo;
