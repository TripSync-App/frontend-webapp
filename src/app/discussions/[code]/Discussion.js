import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/app/lib";
import Map from "./Map";
import Message from "./Message";

const Discussion = ({ discussion }) => {
  let token = "";
  try {
    token = localStorage.getItem("accessToken");
  } catch {}
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      await fetch(`/api/discussions/messages/${discussion.discussion_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <div className="flex flex-row mr-auto ml-auto h-[75vh]">
        <div id="mainContent" className="p-2 mr-4">
          <Typography variant="h3">{discussion.title}</Typography>
          <div className="p-4 h-[50%] w-full">
            <Map></Map>
          </div>
          <div id="messages" className="mt-4">
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
