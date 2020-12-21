import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AddPlayer, RemovePlayer, AddTeamPlayer } from "../../utils/Functions";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Player.Styled";
import * as G from "../../themes/Global.styled";
import logoImg from "../../assets/logo.svg";
import backImg from "../../assets/playerImg.jpg";

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
  // used for remove botton toggle
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
      <G.PageBackground backImg={backImg} />

      <Section
        center={true}
        background={(props) => props.theme.secondary.background}
      >
        <G.Block>
          {/* Notification is turn on and off by "error" object status property */}
          {error.status && (
            <Notification
              notificationMessage={error.msg}
              handleClick={() => setError({ status: false })}
              color={error.color}
            />
          )}

          <S.Title selected={true}>PLAYERS</S.Title>

          <G.StyledLink to="/team">
            <S.Title>TEAMS</S.Title>
          </G.StyledLink>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {/* ### ADD PLAYER BLOCK ### */}
            <G.InputBlock>
              {/* using object "player" status property to turn on/off this section */}
              {/* this button set's it on ->  */}
              <Button handleClick={() => setPlayer({ status: true })}>
                ADD PLAYER
              </Button>
            </G.InputBlock>
            {/* -> this section is responding to object's "player" status change */}
            {player.status && (
              <G.InputBlock>
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
              </G.InputBlock>
            )}
          </form>

          <G.Frame>
            {/* ### LOADING/BACKEND MESSAGES ### */}
            {/* is allways displayed untill is rewriten with data.msg or data */}
            {(data.msg || !data.length > 0) && (
              <S.Subtitle> {data.msg || "loading..."}</S.Subtitle>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* ### ADD TO TEAM BLOCK ### */}
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
                    <G.InputBlock sticky={true}>
                      <G.Frame>
                        <S.FlexBlock>
                          {/* displaying recieved messege from back end (if user has no team set up yet) */}
                          {teamData.msg && (
                            <>
                              <S.P>{teamData.msg}</S.P>
                              <G.StyledLink to="/team">
                                create your team
                              </G.StyledLink>
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
                      </G.Frame>
                    </G.InputBlock>
                  )}
                </>
              )}

              {/*  ### PLAYER LIST BLOCK ### */}
              {/* validating data from first fetch with array.length method */}
              {data.length > 0 &&
                // mapping and displaying first fetch data
                data.map((x, i) => (
                  <G.TableButtonBlock key={i}>
                    <G.InputBrick>
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
                    </G.InputBrick>
                  </G.TableButtonBlock>
                ))}
            </form>
          </G.Frame>
        </G.Block>

        <G.ButtonBlock>
          <Link to="/">
            <Button>BACK</Button>
          </Link>
        </G.ButtonBlock>
      </Section>

      <Link to="/">
        <G.Logo src={logoImg} alt="teamo logo" />
      </Link>
    </>
  );
}

export default Player;
