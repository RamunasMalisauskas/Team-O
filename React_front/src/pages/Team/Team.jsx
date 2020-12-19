import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Team.Styled";
import logoImg from "../../assets/logo.svg";

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

function Team() {
  const auth = useContext(AuthContext);
  // main data is used to store team name
  const [data, setData] = useState({});

  const [teamData, setTeamData] = useState({});
  const [teamPlayerData, setTeamPlayerData] = useState({});
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
          <S.Title>TEAMS</S.Title>

          <S.Frame>
            {/* form preventing to refresh and  monitoring submits */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* if there is no team in DB message is recieved and displayed here */}
              {data.msg && (
                <>
                  <S.P>{data.msg}</S.P>
                </>
              )}

              <S.FlexBlock>
                {/* validating first fetch data (as array) and displaying as buttons with team names */}
                {data.length > 0 &&
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
                      }}
                    >
                      {x.team_name}
                    </Button>
                  ))}
                <Button>PLUS</Button>
              </S.FlexBlock>

              {teamData.length > 0 &&
                // mapping and displaying first fetch data
                teamData.map((x, i) => (
                  <S.TableButtonBlock key={i}>
                    <S.InputBrick>
                      <Input
                        type="radio"
                        radio={[{ value: x.players, label: x.players }]}
                      />
                    </S.InputBrick>
                    {/* remove button calls specific fetch/DELETE function */}
                    <Button type="submit">X</Button>
                  </S.TableButtonBlock>
                ))}
            </form>
          </S.Frame>
        </S.Block>
      </Section>

      <Link to="/">
        <S.Logo src={logoImg} alt="teamo logo" />
      </Link>
    </>
  );
}

export default Team;
