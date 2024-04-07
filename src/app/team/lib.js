export const fetchTeams = (token) => {
  return fetch(`/api/teams/owned`, {
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
  return fetch(`/api/teams`, {
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
  return fetch(`/api/teams/remove-user`, {
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

export const createInviteCode = async (team, token) => {
  return fetch(`/api/teams/create-invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      team_id: team,
    }),
  })
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const getInviteCode = async (team, token) => {
  return fetch(`/api/teams/get-invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      team_id: team,
    }),
  })
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const deleteAccount = async () => {
  return fetch(`/api/users/delete`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const deleteTeam = async (team) => {
  return fetch(`/api/teams/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      team_id: team,
    }),
  })
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
