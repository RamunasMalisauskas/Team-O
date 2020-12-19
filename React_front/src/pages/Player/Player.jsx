import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Player.Styled";
import logoImg from "../../assets/logo.svg";

// FETCH/POST function to add player to database
// ir uses four props: object player with has name ->
// -> "auth" (getting it from context) and setError(hook is used to calling notification) ->
// -> setError for notification manegment ->
// -> setData is used to get updated data straight from DB
function AddPlayer(player, auth, setError, setData) {
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
}
// FETCH/DELETE function to remove player from database
// same functionality as FETCH/POST, also we're setting data again after deletion
function RemovePlayer(player, auth, setError, setData) {
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
}

// FETCH/POST function to add selected player to team database
// ir uses three props: object team which has team name and selected player name  ->
// -> "auth" (getting it from context) and setError(hook is used to calling notification) ->
// -> setError for notification manegment
function AddTeamPlayer(team, auth, setError) {
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
}

function Player() {
  const auth = useContext(AuthContext);
  // main data is used for player list
  const [data, setData] = useState({});
  // team data is used to store team list
  const [teamData, setTeamData] = useState({});
  // object error has status for hidden/visible function, msg for notification text, and color to set notification to error or regular style
  const [error, setError] = useState({ status: false, msg: "", color: "" });
  // object player has name for the AddPlayer funcion, id for RemovePlayer and status for component functionality ->
  // - >it's also used as hook for creating new player
  const [player, setPlayer] = useState({ status: false, name: "", id: "" });
  // used for assing player to team
  const [team, setTeam] = useState({ status: false, name: "" });

  const [removeBtn, setRemoveBtn] = useState(false);

  // fetching players from DB
  useEffect(() => {
    fetch("http://localhost:8080/players", {
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
          setTeamData(data);
        } else {
          // if there is nothing in database set notification as error with backend message
          setTeamData({ msg: data.msg });
        }
      });
  }, []);

  return (
    <>
      <S.PageBackground />

      <Section
        center={true}
        background={(props) => props.theme.secondary.background}
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
          <S.Title>PLAYERS</S.Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <S.InputBlock>
              {/* using object "player" status property to turn on/off this section */}
              {/* this button set's it on ->  */}
              <Button handleClick={() => setPlayer({ status: true })}>
                ADD PLAYER
              </Button>
            </S.InputBlock>
            {/* -> this section is responding to object's "player" status change */}
            {player.status && (
              <S.InputBlock>
                <Input
                  placeholder="enter new players name"
                  handleChange={(e) => {
                    setPlayer({ name: e.target.value, status: true });
                  }}
                />
                <S.FlexBlock>
                  <Button
                    color="primary"
                    type="submit"
                    handleClick={() => {
                      AddPlayer(player, auth, setError, setData);
                    }}
                  >
                    SAVE
                  </Button>
                  <Button
                    handleClick={() => {
                      setPlayer({ status: false });
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
            {!data.msg && !data.length > 0 && (
              <S.Subtitle>loading...</S.Subtitle>
            )}

            {/* this subtitle will be displayed if the server is up but there is no data fetched (look up first fetch second .then "else" part ) */}
            {data.msg && <S.Subtitle>{data.msg}</S.Subtitle>}

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* after recieving data (testing with array.length method) from DB this section is visible */}
              {data.length > 0 && (
                <>
                  <S.FlexBlock sticky={true}>
                    <Button
                      sticky={true}
                      color="primary"
                      handleClick={() => setTeam({ status: true })}
                    >
                      ADD TO MY TEAM
                    </Button>

                    {data.length > 0 && removeBtn && (
                      <S.InputBrick>
                        <Button
                          type="submit"
                          handleClick={(e) => {
                            RemovePlayer(player, auth, setError, setData);
                            console.log(player);
                          }}
                        >
                          X
                        </Button>
                      </S.InputBrick>
                    )}
                  </S.FlexBlock>

                  {/*  same logic as before turning on/off part of section with object status, this time it's "team" */}
                  {team.status && (
                    <S.InputBlock sticky={true}>
                      <S.Frame>
                        <S.FlexBlock>
                          {/* displaying recieved messege from back end (if user has no team set up yet) */}
                          {teamData.msg && (
                            <>
                              <S.P>{teamData.msg}</S.P>
                              <S.StyledLink to="/team">
                                create your team
                              </S.StyledLink>
                            </>
                          )}

                          {/* after recieving data from DB (testing with array.length method) this section is visible */}
                          {teamData.length > 0 &&
                            // data from second fecth is maped and displayed ->
                            // -> input is seting object with target.value and "player" object propery "name"
                            teamData.map((x, i) => (
                              <div key={i}>
                                <Input
                                  type="radio"
                                  handleChange={(e) =>
                                    setTeam({
                                      status: true,
                                      name: e.target.value,
                                      player_name: player.name,
                                    })
                                  }
                                  radio={[
                                    { value: x.team_name, label: x.team_name },
                                  ]}
                                />
                              </div>
                            ))}
                          {/* button is submiting props to function ->
                          -> he has to be visible only when there is teamData fetched from DB */}
                          {teamData.length > 0 && (
                            <Button
                              color="primary"
                              type="submit"
                              handleClick={() => {
                                AddTeamPlayer(team, auth, setError);
                              }}
                            >
                              SAVE
                            </Button>
                          )}
                          {/* button to close this part of section */}
                          <Button
                            handleClick={() => setTeam({ status: false })}
                          >
                            CLOSE
                          </Button>
                        </S.FlexBlock>
                      </S.Frame>
                    </S.InputBlock>
                  )}
                </>
              )}
              {/* 
              {data &&
                (<div>TEST</div>)(data.length > 0 && <div>TEST PASSED</div>)} */}
              {/* validating data from first fetch with array.length method */}
              {data.length > 0 &&
                // mapping and displaying first fetch data
                data.map((x, i) => (
                  <S.TableButtonBlock key={i}>
                    <S.InputBrick>
                      <Input
                        type="radio"
                        handleChange={(e) => {
                          setPlayer({
                            name: e.target.value,
                            id: x.id,
                          });
                          setRemoveBtn(true);
                        }}
                        radio={[{ value: x.name, label: x.name }]}
                      />
                    </S.InputBrick>
                  </S.TableButtonBlock>
                ))}
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

export default Player;
