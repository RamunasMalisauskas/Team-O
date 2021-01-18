// ### TEAM PAGE FUNCTIONS ###

// FETCH/POST function to add new team to database
// it uses four props: object team with has name ->
// -> "auth" (getting it from context) and setError(hook is used to calling notification) ->
// -> setError for notification manegment ->
// -> setData is used to get updated data straight from DB
export const AddTeam = (team, auth, setError, setData) => {
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/add_team`, {
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
      fetch(`${process.env.REACT_APP_NODE_ROUTES}/teams`, {
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
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/team_players`, {
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
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/trade_player`, {
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
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/remove_team_player`, {
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
      fetch(`${process.env.REACT_APP_NODE_ROUTES}/team_players`, {
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
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/remove_team`, {
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
      fetch(`${process.env.REACT_APP_NODE_ROUTES}/teams`, {
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
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/players`, {
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
      fetch(`${process.env.REACT_APP_NODE_ROUTES}/players`, {
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
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/players`, {
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
      fetch(`${process.env.REACT_APP_NODE_ROUTES}/players`, {
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
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/add_players_to_team`, {
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

// ### LOGIN/REG PAGE FUNCTION ###

// FETCH POST login function
//  passing props to function
export const Login = (fieldValues, auth, history, setError) => {
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // posting values passed as props from form
      email: fieldValues.email,
      password: fieldValues.password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        // token with nessesery addon ("Bearer ") saved in context
        // and passing admin value from backend to context
        auth.setToken("Bearer " + data.token);

        // after token is successfuly added to context you are redirected to home page
        history.push("/");
      } else {
        setError({ status: true, msg: data.msg || "input error" });
      }
    })
    .catch((err) => {
      // if error occor it's shown in notification
      setError({ status: true, msg: "server error" });
    });
};

// FETCH POST register function
export const Reg = (fieldValues, auth, setError) => {
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: fieldValues.email,
      password: fieldValues.password,
      password2: fieldValues.password2,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        // token with nessesery addon ("Bearer ") saved in context
        auth.setToken("Bearer " + data.token);
        // notification informs about successful registry
        setError({
          status: true,
          msg: data.msg,
          color: "" || "registry completed",
        });
      } else {
        // or displays error fetch from backend (data.msg)
        setError({
          status: true,
          color: "error",
          msg: data.msg || "input error",
        });
      }
    })
    .catch((err) => {
      setError({ status: true, color: "error", msg: "server error" });
    });
};
