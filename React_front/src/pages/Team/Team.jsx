import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import {
  AddTeam,
  TeamPlayers,
  TradePlayer,
  RemoveTeamPlayer,
  RemoveTeam,
} from "../../utils/Functions";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Team.Styled";
import * as G from "../../themes/Global.styled";
import logoImg from "../../assets/logo.svg";
import backImg from "../../assets/teamImg.jpg";

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
  }, [auth]);

  return (
    <>
      <G.PageBackground backImg={backImg} />

      <Section
        center={true}
        background={(props) => props.theme.support.background}
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

          <div>
            <G.StyledLink to="/player">
              <S.Title>PLAYERS</S.Title>
            </G.StyledLink>

            <S.Title selected={true}>TEAMS</S.Title>
          </div>

          {/* ### ADD TEAM BLOCK ### */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <G.InputBlock>
              {/* using object "newTeam" status property to turn on/off this section */}
              {/* this button set's it on ->  */}
              <Button
                color="support"
                handleClick={() => setNewTeam({ status: true })}
              >
                ADD TEAM
              </Button>
            </G.InputBlock>

            {/* -> this section is responding to object's "newTeam" status change */}
            {newTeam.status && (
              <G.InputBlock>
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
              </G.InputBlock>
            )}
          </form>

          <G.Frame border="support">
            {/* ### LOADING/BACKEND MESSAGES ### */}
            {/* is allways displayed untill is rewriten with data.msg or data */}
            {(data.msg || !data.length > 0) && (
              <S.Subtitle>{data.msg || `loading...`}</S.Subtitle>
            )}

            {/* ### TEAM BLOCK ### */}
            {/* form preventing to refresh and  monitoring submits */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {data.length > 0 && !trade.status && (
                <>
                  <S.Subtitle>TEAMS:</S.Subtitle>

                  {/* validating first fetch data (as array) and displaying as buttons with team names */}
                  <S.FlexBlock>
                    {data.map((x, i) => (
                      <S.Row key={i}>
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
                      </S.Row>
                    ))}
                  </S.FlexBlock>
                </>
              )}

              {/* ### TRADE PLAYER BLOCK ### */}
              {data.length > 0 && trade.status && !removeTeam.status && (
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

              {/*  if there is message from back-end it's displayed here (about team data) */}
              {teamData.msg && player && (
                <S.Subtitle>{teamData.msg}</S.Subtitle>
              )}

              {/* trade block is replacing this header when it's status changes */}
              {teamData.length > 0 && !trade.status && !removeTeam.status && (
                <>
                  <S.Subtitle>{selectedTeam.team_name} PLAYERS:</S.Subtitle>
                  {
                    // mapping team players as inputs
                    teamData.map((x, i) => (
                      <G.TableButtonBlock key={i}>
                        <S.FlexBlock>
                          <G.InputBrick>
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
                          </G.InputBrick>

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
                      </G.TableButtonBlock>
                    ))
                  }
                </>
              )}

              {/* ### REMOVE TEAM BLOCK ### */}
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
                      setRemoveTeam({ status: false });
                      setTeamData("");
                    }}
                  >
                    YES
                  </Button>
                </>
              )}

              {selectedTeam.status && (
                <G.InputBrick>
                  <Button
                    type="submit"
                    color="support"
                    handleClick={() => {
                      setRemoveTeam({ status: true });
                    }}
                  >
                    REBUILD
                  </Button>
                </G.InputBrick>
              )}
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

export default Team;
