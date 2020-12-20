import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Team.Styled";
import logoImg from "../../assets/logo.svg";

// FETCH/POST function to add new team to database
// it uses four props: object team with has name ->
// -> "auth" (getting it from context) and setError(hook is used to calling notification) ->
// -> setError for notification manegment ->
// -> setData is used to get updated data straight from DB
function AddTeam(team, auth, setError, setData) {
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
}
// FETCH/POST function to fetch selected team players. ->
// -> team is passed as an object with name propery, auth is taken from context and setError is hook for notification manegment
function TeamPlayers(team, auth, setError, setTeamData) {
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
}

// FETCH/POST function to move player to new team in database
// it uses six props: last three has the same logic as second fetch/post ->
// -> "player" is selected with input before pressing trade button ->
// -> "team" is seleced as button from displayed teams after pressing trade button ->
// -> "selectedTeam" is fetched from object which is setted after selecting team
function TradePlayer(player, team, selectedTeam, auth, setError, setTeamData) {
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
}

// FETCH/DELETE function to remove player from database
// same functionality as FETCH/POST, also we're setting data again after deletion
function RemoveTeamPlayer(selectedTeam, player, auth, setError, setTeamData) {
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
}

// FETCH/DELETE function to remove team from database
// same functionality as FETCH/POST, also we're setting data again after deletion
function RemoveTeam(selectedTeam, auth, setError, setData) {
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
}

function Team() {
  const auth = useContext(AuthContext);
  // main data is used to store team name
  const [data, setData] = useState({});
  //  second data is used to store team player info
  const [teamData, setTeamData] = useState({});
  //  new team object is uset to store and pass input data, to create new team
  const [newTeam, setNewTeam] = useState({ status: false, name: "" });
  //  selected team object is used for player trade / team deletion functions
  const [selectedTeam, setSelectedTeam] = useState({
    status: false,
    team_name: "",
  });
  // trade is used as control block for all elements/components that are nedded for trade function
  const [trade, setTrade] = useState({ state: false });
  // trade is used as control block for all elements/components that are nedded for trade function
  const [removeTeam, setRemoveTeam] = useState({ state: false });
  //  player hook is used for trade player function
  const [player, setPlayer] = useState();
  // error object is for notification manegment
  const [error, setError] = useState({ status: false, msg: "", color: "" });

  // fetching team names from DB
  useEffect(() => {
    fetch("http://localhost:8080/teams", {
      headers: {
        Authorization: `${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // validatind fetched data
        if (data.length > 0) {
          setData(data);
        } else {
          // if there is nothing in database set notification as error with backend message
          setData({ msg: data.msg });
        }
      });
  }, []);

  return (
    <>
      <S.PageBackground />

      <Section
        center={true}
        background={(props) => props.theme.support.background}
      >
        {/* Notification is turn on and off by "error" object status property */}
        {error.status && (
          <Notification
            notificationMessage={error.msg}
            handleClick={() => setError({ status: false })}
            color={error.color}
          />
        )}

        <S.Block>
          <S.StyledLink to="/player">
            <S.Title>PLAYERS</S.Title>
          </S.StyledLink>

          <S.Title selected={true}>TEAMS</S.Title>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <S.InputBlock>
              {/* using object "newTeam" status property to turn on/off this section */}
              {/* this button set's it on ->  */}
              <Button
                color="support"
                handleClick={() => setNewTeam({ status: true })}
              >
                ADD TEAM
              </Button>
            </S.InputBlock>

            {/* -> this section is responding to object's "newTeam" status change */}
            {newTeam.status && (
              <S.InputBlock>
                <Input
                  placeholder="enter team name"
                  handleChange={(e) => {
                    setNewTeam({ name: e.target.value, status: true });
                  }}
                />

                <S.FlexBlock>
                  <Button
                    color="support"
                    type="submit"
                    handleClick={() => {
                      AddTeam(newTeam, auth, setError, setData);
                    }}
                  >
                    SAVE
                  </Button>
                  <Button
                    handleClick={() => {
                      setNewTeam({ status: false });
                    }}
                  >
                    CLOSE
                  </Button>
                </S.FlexBlock>
              </S.InputBlock>
            )}
          </form>

          <S.Frame>
            {/* is allways displayed untill is rewriten with data.msg or data */}
            {!data.msg && !data.length > 0 && <S.P>loading...</S.P>}

            {/* form preventing to refresh and  monitoring submits */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* if there is no team in DB message is recieved and displayed here */}
              {data.msg && <S.P>{data.msg}</S.P>}

              {data.length > 0 && !trade.status && (
                <S.Subtitle>TEAMS:</S.Subtitle>
              )}

              <S.FlexBlock>
                {/* validating first fetch data (as array) and displaying as buttons with team names */}
                {data.length > 0 &&
                  !trade.status &&
                  data.map((x, i) => (
                    <Button
                      key={i}
                      handleClick={() => {
                        TeamPlayers(
                          { name: x.team_name },
                          auth,
                          setError,
                          setTeamData
                        );
                        // reseting selected player from previous team when swittiching teams
                        setPlayer({ name: "" });
                        setSelectedTeam({
                          status: true,
                          team_name: x.team_name,
                        });
                        // resseting remove team status thus closing remove block when swittiching teams
                        setRemoveTeam({ status: false });
                      }}
                    >
                      {x.team_name}
                    </Button>
                  ))}
              </S.FlexBlock>

              {/*  if there is message from back-end it's displayed here */}
              {teamData.msg && <S.Subtitle>{teamData.msg}</S.Subtitle>}

              {/* trade block is replacing this header when it's status changes */}
              {teamData.length > 0 && !trade.status && (
                <S.Subtitle>PLAYERS:</S.Subtitle>
              )}

              {data.length > 0 && trade.status && (
                <>
                  <S.Subtitle>SELECT TEAM TO FINISH TRADE:</S.Subtitle>

                  {/* mapping team buttons again with diferent function attached */}
                  {data.map((x, i) => (
                    <Button
                      key={i}
                      handleClick={() => {
                        TradePlayer(
                          player,
                          { team_name: x.team_name },
                          selectedTeam,
                          auth,
                          setError,
                          setTeamData
                        );
                        setTrade({ status: false });
                        // reseting selected player from previous team when swithcing teams
                        setPlayer({ name: "" });
                      }}
                    >
                      {x.team_name}
                    </Button>
                  ))}
                </>
              )}

              {teamData.length > 0 &&
                // mapping team players as inputs
                teamData.map((x, i) => (
                  <S.TableButtonBlock key={i}>
                    <S.FlexBlock>
                      <S.InputBrick>
                        <Input
                          type="radio"
                          radio={[{ value: x.players, label: x.players }]}
                          handleChange={(e) => {
                            setPlayer({
                              name: e.target.value,
                              id: x.id,
                            });
                          }}
                        />
                      </S.InputBrick>

                      <div>
                        <Button
                          type="submit"
                          color="support"
                          handleClick={() => {
                            setTrade({ status: true });
                          }}
                        >
                          TRADE
                        </Button>

                        <Button
                          type="submit"
                          handleClick={() => {
                            RemoveTeamPlayer(
                              selectedTeam,
                              player,
                              auth,
                              setError,
                              setTeamData
                            );
                            // reseting player name with hook after remove
                            setPlayer({ name: "" });
                          }}
                        >
                          X
                        </Button>
                      </div>
                    </S.FlexBlock>
                  </S.TableButtonBlock>
                ))}

              {removeTeam.status && (
                <>
                  <S.Subtitle>
                    Are you sure about deleting entire team?
                  </S.Subtitle>

                  <Button
                    type="submit"
                    handleClick={() => {
                      setRemoveTeam({ status: false });
                    }}
                  >
                    NO
                  </Button>

                  <Button
                    type="submit"
                    color="support"
                    handleClick={() => {
                      RemoveTeam(selectedTeam, auth, setError, setData);
                    }}
                  >
                    YES
                  </Button>
                </>
              )}

              {selectedTeam.status && (
                <S.InputBrick>
                  <Button
                    type="submit"
                    color="support"
                    handleClick={() => {
                      setRemoveTeam({ status: true });
                    }}
                  >
                    REBUILD
                  </Button>
                </S.InputBrick>
              )}
            </form>
          </S.Frame>
        </S.Block>

        <S.ButtonBlock>
          <Link to="/">
            <Button>BACK</Button>
          </Link>
        </S.ButtonBlock>
      </Section>

      <Link to="/">
        <S.Logo src={logoImg} alt="teamo logo" />
      </Link>
    </>
  );
}

export default Team;
