import { Typography } from "@mui/material";
import React from "react";

const Message = ({ message }) => {
  return (
    <>
      <Typography>
        {message.author.first_name} {message.author.last_name}
      </Typography>
      <Typography>{message.text}</Typography>
    </>
  );
};

export default Message;
