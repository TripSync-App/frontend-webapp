import React from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import UserActivity from "./UserActivity";
import TeamActivity from "./TeamActivity";

const RecentActivity = () => {
  const theme = useTheme();
  return (
    <Box
      className="p-4 mt-4 mr-4 rounded-lg w-full max-h-[90vh] max-sm:max-h-full max-sm:mr-0 max-sm:mt-0"
      style={{ backgroundColor: theme.palette.cardColors }}
    >
      <div className="flex flex-row max-sm:flex-col h-full ">
        <UserActivity></UserActivity>
        <Divider
          className="h-full"
          orientation="vertical"
          flexItem
          sx={{ mr: 2, ml: 2, borderRightWidth: 3 }}
        />
        <TeamActivity></TeamActivity>
      </div>
    </Box>
  );
};

export default RecentActivity;
