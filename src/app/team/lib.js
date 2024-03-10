import { API_URL } from "../constants";
const token = localStorage.getItem("accessToken");

export const fetchTeams = () => {
  return fetch(`${API_URL}/teams/owned`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
};

export const createTeam = () => {
  const result = fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: "test" }),
  });
};
