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

export const createTeam = async (name) => {
  return fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: name }),
  })
    .then((response) => {
      console.log(response.status);

      return response
        .json()
        .then((data) => ({ status: response.status, data }));
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const deleteUser = async (username, team) => {
  return fetch(`${API_URL}/teams/remove-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user: { username: username },
      team: { team_id: team },
    }),
  })
    .then((response) => {
      console.log(response.status);

      return response
        .json()
        .then((data) => ({ status: response.status, data }));
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
