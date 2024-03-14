"use client";
import { API_URL } from "@/app/constants";
import React, { useEffect } from "react";

function InvitePage({ params }) {
  const inviteCode = params.code;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch(`${API_URL}/teams/redeem-invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code: inviteCode }),
    })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });

  }, [])

  return (
    <div>
      <p>Invite Code: {inviteCode}</p>
    </div>
  );
}

export default InvitePage;
