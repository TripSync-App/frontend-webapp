import { Typography, useTheme, Divider, Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/app/lib";
import Map from "./Map";
import Message from "./Message";

const Discussion = ({ discussion }) => {
  let token = "";
  let userData = {};
  try {
    token = localStorage.getItem("accessToken");
    userData = JSON.parse(localStorage.getItem("userData"));
  } catch {}

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const theme = useTheme();

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

  useEffect(() => {
    getMessages();
  }, [discussion.discussion_id]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessage.trim()) return;
    await createMessage(newMessage);
    setNewMessage("");
  };

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
          <Divider></Divider>
          <Typography variant="h5" sx={{ color: theme.palette.fontColor }}>
            Map
          </Typography>
          <Divider></Divider>
          <div className="p-4 h-[50%] w-full">
            <Map></Map>
          </div>
          <Divider className="mt-4"></Divider>
          <div id="messages" className="mt-4">
            <Typography variant="h5" sx={{ color: theme.palette.fontColor }}>
              Messages
            </Typography>
            <Divider></Divider>
            {messages.map((message, index) => (
              <Message message={message} key={index}></Message>
            ))}
            <form
              id="create-message"
              className="p-2 mb-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row p-2">
                <Avatar className="mr-2"></Avatar>
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  placeholder="Type your message here..."
                  className="input w-1/2 h-auto p-2 rounded-md"
                  style={{ color: "black" }}
                />
                <button
                  type="submit"
                  className="btn ml-2"
                  sx={{ color: theme.palette.fontColor }}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="sideBar" className="p-2">
          <Typography sx={{ color: theme.palette.fontColor }}>
            Sidebar
          </Typography>
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
        </div>
      </div>
    </>
  );
};

export default Discussion;
