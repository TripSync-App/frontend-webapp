import { Typography } from "@mui/material";
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
      <div className="flex flex-row mr-auto ml-auto h-[75vh]">
        <div id="mainContent" className="p-2 mr-4">
          <Typography variant="h3">{discussion.title}</Typography>
          <div className="p-4 h-[50%] w-full">
            <Map></Map>
          </div>
          <form id="create-message" className="mt-4" onSubmit={handleSubmit}>
            <input
              type="text"
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Type your message here..."
              className="input"
            />
            <button type="submit" className="btn">
              Send
            </button>
          </form>
          <div id="messages" className="mt-4">
            <Typography variant="h4">Messages</Typography>
            {messages.map((message, index) => (
              <Message message={message} key={index}></Message>
            ))}
          </div>
        </div>
        <div id="sideBar" className="p-2">
          <p>Sidebar</p>
          <p>Created At: {formatDate(discussion.timestamp)}</p>
          <p>Last Updated: {formatDate(discussion.last_updated)}</p>
        </div>
      </div>
    </>
  );
};

export default Discussion;
