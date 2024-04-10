import {
  Typography,
  useTheme,
  Divider,
  Avatar,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { formatDate } from "@/app/lib";
import Map from "./Map";
import Message from "./Message";
import BasicDateCalendar from "@/app/components/BasicDateCalendar";

const Discussion = ({ discussion }) => {
  let token = "";
  let userData = {};
  try {
    token = localStorage.getItem("accessToken");
    userData = JSON.parse(localStorage.getItem("userData"));
  } catch {}

  console.log(`Discussion: ${JSON.stringify(discussion)}`);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [checked, setChecked] = useState(discussion.finalized);
  const userActionRef = useRef(false); // Ref to track user-initiated action
  const [isAdmin, setIsAdmin] = useState(
    userData.username == discussion.admin_user,
  );

  console.log(`is admin :${isAdmin}`);
  const theme = useTheme();

  const handleChange = () => {
    setChecked(!checked);
    userActionRef.current = true; // Mark this change as user-initiated
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const getMessages = async () => {
    try {
      const response = await fetch(
        `/api/discussions/messages/${discussion.discussion_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createMessage = async (message) => {
    const messageBody = {
      author: userData.user_id,
      text: message,
      discussion: discussion.discussion_id,
    };
    try {
      await fetch(`/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageBody }),
      });
      getMessages();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessage.trim()) return;
    await createMessage(newMessage);
    setNewMessage("");
  };

  const finalize = async () => {
    const messageBody = {
      discussion: discussion.discussion_id,
      is_finalized: checked,
    };

    try {
      await fetch(`/api/discussions/finalize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageBody),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, [discussion.discussion_id]);

  useEffect(() => {
    if (userActionRef.current) {
      finalize();
      discussion.finalized = !discussion.finalized;
      userActionRef.current = false;
    }
  }, [checked]);

  return (
    <>
      <div className="flex flex-row mr-4 ml-4 h-auto">
        <div
          id="mainContent"
          className="p-2 mr-4 mt-2 mb-2 w-[75%] h-full rounded-md"
          style={{ backgroundColor: theme.palette.hueShift }}
        >
          <Typography variant="h5" sx={{ color: theme.palette.fontColor }}>
            {discussion.title}
          </Typography>
          <Divider sx={{ backgroundColor: theme.palette.lighten }}></Divider>
          <Typography variant="h5" sx={{ color: theme.palette.fontColor }}>
            Map
          </Typography>
          <Divider sx={{ backgroundColor: theme.palette.lighten }}></Divider>
          <div className="p-4 h-[50%] w-full">
            <Map></Map>
          </div>
          <div id="messages" className="mt-4">
            <Typography variant="h5" sx={{ color: theme.palette.fontColor }}>
              Messages
            </Typography>
            <Divider
              sx={{ backgroundColor: theme.palette.lighten, mb: 2 }}
            ></Divider>
            {messages.map((message, index) => (
              <Message message={message} key={index}></Message>
            ))}
            <form
              id="create-message"
              className="p-2 mb-4"
              onSubmit={handleSubmit}
            >
              <div
                className="flex flex-row p-2"
                style={{ backgroundColor: theme.palette.hueShift }}
              >
                <Avatar className="mr-2"></Avatar>
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  placeholder="Type your message here..."
                  className="input w-1/2 h-auto p-2 rounded-md"
                  style={{ color: "black" }}
                  disabled={checked}
                />
                <button
                  type="submit"
                  className="btn ml-2"
                  sx={{ color: theme.palette.fontColor }}
                  disabled={checked}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="sideBar" className="p-2">
          <BasicDateCalendar disabled={!isAdmin} />
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.fontColor }}
          >
            Created At
          </Typography>
          <Typography
            variant="body2"
            className="rounded-sm p-1"
            sx={{
              color: theme.palette.fontColor,
              backgroundColor: theme.palette.hueShift,
            }}
          >
            {formatDate(discussion.timestamp)}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.fontColor }}
          >
            Last Updated
          </Typography>
          <Typography
            variant="body2"
            className="rounded-sm p-1"
            sx={{
              color: theme.palette.fontColor,
              backgroundColor: theme.palette.hueShift,
            }}
          >
            {formatDate(discussion.last_updated)}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  disabled={!isAdmin}
                />
              }
              label="Finalized"
            />
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default Discussion;
