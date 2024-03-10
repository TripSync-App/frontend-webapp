import { ListItem, ListItemText } from "@mui/material";
import React from "react";

const MemberItem = ({ item }) => {
  return (
    <ListItem sx={{ width: "100%", bgcolor: "grey" }}>
      <ListItemText
        primary={`${item.first_name} ${item.last_name}`}
        secondary={item.username}
      />
    </ListItem>
  );
};

export default MemberItem;
