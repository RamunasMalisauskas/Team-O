import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AddPlayer, RemovePlayer, AddTeamPlayer } from "../../utils/Functions";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Player.Styled";
import logoImg from "../../assets/logo.svg";

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
  }, [auth]);

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
  }, [auth]);

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
          <S.Title selected={true}>PLAYERS</S.Title>

          <S.StyledLink to="/team">
            <S.Title>TEAMS</S.Title>
          </S.StyledLink>

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
            {data.msg && <S.P>{data.msg}</S.P>}

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* after recieving data (testing with array.length method) from DB this section is visible-> 
              -> after pressing add to by team btn remove button becomes hidden */}
              {data.length > 0 && (
                <>
                  <S.FlexBlock sticky={true}>
                    <Button
                      color="primary"
                      handleClick={() => {
                        setTeam({ status: true });
                        setRemoveBtn(false);
                      }}
                    >
                      ADD TO MY TEAM
                    </Button>

                    {/* remove button activates remove player function and restarts player value in hook */}
                    {data.length > 0 && removeBtn && (
                      <Button
                        type="submit"
                        handleClick={(e) => {
                          RemovePlayer(player, auth, setError, setData);
                          setPlayer({ name: "" });
                        }}
                      >
                        X
                      </Button>
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
                                  handleChange={(e) => {
                                    setTeam({
                                      status: true,
                                      name: e.target.value,
                                      player_name: player.name,
                                    });
                                  }}
                                  radio={[
                                    { value: x.team_name, label: x.team_name },
                                  ]}
                                />
                              </div>
                            ))}
                          {/* button is submiting props to function ->
                          -> he has to be visible only when there is teamData fetched from DB -> 
                          -> setPlayer restarts value of player in hook (all nessesery info is saved into "team")*/}
                          {teamData.length > 0 && (
                            <Button
                              color="primary"
                              type="submit"
                              handleClick={() => {
                                AddTeamPlayer(team, auth, setError);
                                setPlayer({ name: "" });
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
