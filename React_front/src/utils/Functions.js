// ### TEAM PAGE FUNCTIONS ###

// FETCH/POST function to add new team to database
// it uses four props: object team with has name ->
// -> "auth" (getting it from context) and setError(hook is used to calling notification) ->
// -> setError for notification manegment ->
// -> setData is used to get updated data straight from DB
export const AddTeam = (team, auth, setError, setData) => {
  fetch("http://localhost:8080/add_team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // token is used to validate session and admin rights
      Authorization: `${auth.token}`,
    },
    //
    body: JSON.stringify({
      name: team.name,
    }),
  })
    // recieving responce from backend and converting it into notification message
    .then((res) => res.json())
    .then((data) => {
      setError({
        status: true,
        msg: data.msg || "success",
        color: "",
      });
    })
    .then(() => {
      fetch("http://localhost:8080/teams", {
        headers: {
          Authorization: `${auth.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    })
    .catch((err) => {
      // all messages are recieved from back-end but in case there isn't one (f.e. server is down) using or operator to send one.
      setError({ status: true, msg: err || "server error", color: "error" });
    });
};

// FETCH/POST function to fetch selected team players. ->
// -> team is passed as an object with name propery, auth is taken from context and setError is hook for notification manegment
export const TeamPlayers = (team, auth, setError, setTeamData) => {
  fetch("http://localhost:8080/team_players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // token is used to validate session and admin rights
      Authorization: `${auth.token}`,
    },
    //
    body: JSON.stringify({
      name: team.name,
    }),
  })
    // recieving responce from backend and converting it into notification message
    .then((res) => res.json())
    .then((data) => {
      setTeamData(data);
    })

    .catch((err) => {
      // all messages are recieved from back-end but in case there isn't one (f.e. server is down) using or operator to send one.
      setError({ status: true, msg: err || "server error", color: "error" });
    });
};

// FETCH/POST function to move player to new team in database
// it uses six props: last three has the same logic as second fetch/post ->
// -> "player" is selected with input before pressing trade button ->
// -> "team" is seleced as button from displayed teams after pressing trade button ->
// -> "selectedTeam" is fetched from object which is setted after selecting team
export const TradePlayer = (
  player,
  team,
  selectedTeam,
  auth,
  setError,
  setTeamData
) => {
  fetch("http://localhost:8080/trade_player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // token is used to validate session and admin rights
      Authorization: `${auth.token}`,
    },
    //
    body: JSON.stringify({
      name: team.team_name,
      player_name: player.name,
      old_team: selectedTeam.team_name,
    }),
  })
    // updating teamData after fetch
    .then((res) => res.json())
    .then((data) => {
      setTeamData(data);
    })

    .catch((err) => {
      // all messages are recieved from back-end but in case there isn't one (f.e. server is down) using or operator to send one.
      setError({ status: true, msg: err || "server error", color: "error" });
    });
};

// FETCH/DELETE function to remove player from database
// same functionality as FETCH/POST, also we're setting data again after deletion
export const RemoveTeamPlayer = (
  selectedTeam,
  player,
  auth,
  setError,
  setTeamData
) => {
  fetch("http://localhost:8080/remove_team_player", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${auth.token}`,
    },
    // backend is expecting id to remove player
    body: JSON.stringify({
      team_name: selectedTeam.team_name,
      player_name: player.name,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        setError({
          status: true,
          msg: "there has been error with data",
          color: "error",
        });
      } else {
        setError({
          status: true,
          msg: data.msg || "success",
          color: "",
        });
      }
    })
    // fetching updated data from DB after deletion
    .then(() => {
      fetch("http://localhost:8080/team_players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // token is used to validate session and admin rights
          Authorization: `${auth.token}`,
        },
        //
        body: JSON.stringify({
          name: selectedTeam.team_name,
        }),
      })
        // recieving responce from backend and converting it into notification message
        .then((res) => res.json())
        .then((data) => {
          setTeamData(data);
        });
    })
    .catch((err) => {
      setError({ status: true, msg: err || "server error", color: "error" });
    });
};

// FETCH/DELETE function to remove team from database
// same functionality as FETCH/POST, also we're setting data again after deletion
export const RemoveTeam = (selectedTeam, auth, setError, setData) => {
  fetch("http://localhost:8080/remove_team", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${auth.token}`,
    },
    body: JSON.stringify({
      name: selectedTeam.team_name,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        setError({
          status: true,
          msg: "there has been error with data",
          color: "error",
        });
      } else {
        setError({
          status: true,
          msg: data.msg || "success",
          color: "",
        });
      }
    })
    // fetching updated data from DB after deletion
    .then(() => {
      fetch("http://localhost:8080/teams", {
        headers: {
          "Content-Type": "application/json",
          // token is used to validate session and admin rights
          Authorization: `${auth.token}`,
        },
      })
        // recieving updated team data and setting the main data
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    })
    .catch((err) => {
      setError({ status: true, msg: err || "server error", color: "error" });
    });
};

// ### PLAYER PAGE FUNCTION ###

// FETCH/POST function to add player to database
// ir uses four props: object player with has name ->
// -> "auth" (getting it from context) and setError(hook is used to calling notification) ->
// -> setError for notification manegment ->
// -> setData is used to get updated data straight from DB
export const AddPlayer = (player, auth, setError, setData) => {
  fetch("http://localhost:8080/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // token is used to validate session and admin rights
      Authorization: `${auth.token}`,
    },
    //
    body: JSON.stringify({
      name: player.name,
    }),
  })
    // recieving responce from backend and converting it into notification message
    .then((res) => res.json())
    .then((data) => {
      setError({
        status: true,
        msg: data.msg || "success",
        color: "",
      });
    })
    .then(() => {
      fetch("http://localhost:8080/players", {
        headers: {
          Authorization: `${auth.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    })
    .catch((err) => {
      // all messages are recieved from back-end but in case there isn't one (f.e. server is down) using or operator to send one.
      setError({ status: true, msg: err || "server error", color: "error" });
    });
};

// FETCH/DELETE function to remove player from database
// same functionality as FETCH/POST, also we're setting data again after deletion
export const RemovePlayer = (player, auth, setError, setData) => {
  fetch("http://localhost:8080/players", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${auth.token}`,
    },
    // backend is expecting id to remove player
    body: JSON.stringify({
      id: player.id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        setError({
          status: true,
          msg: "there has been error with data",
          color: "error",
        });
      } else {
        setError({
          status: true,
          msg: data.msg || "success",
          color: "",
        });
      }
    })
    // fetching updated data from DB after deletion
    .then(() => {
      fetch("http://localhost:8080/players", {
        headers: {
          Authorization: `${auth.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    })
    .catch((err) => {
      setError({ status: true, msg: err || "server error", color: "error" });
    });
};

// FETCH/POST function to add selected player to team database
// ir uses three props: object team which has team name and selected player name  ->
// -> "auth" (getting it from context) and setError(hook is used to calling notification) ->
// -> setError for notification manegment
export const AddTeamPlayer = (team, auth, setError) => {
  fetch("http://localhost:8080/add_players_to_team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // token is used to validate session and admin rights
      Authorization: `${auth.token}`,
    },

    //
    body: JSON.stringify({
      name: team.name,
      player_name: team.player_name,
    }),
  })
    // recieving responce from backend and converting it into notification message
    .then((res) => res.json())
    .then((data) => {
      setError({
        status: true,
        msg: data.msg || "success",
        color: "",
      });
    })
    .catch((err) => {
      // all messages are recieved from back-end but in case there isn't one (f.e. server is down) using or operator to send one.
      setError({ status: true, msg: err || "server error", color: "error" });
    });
};