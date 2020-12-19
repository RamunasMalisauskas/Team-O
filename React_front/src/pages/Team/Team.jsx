import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Team.Styled";
import logoImg from "../../assets/logo.svg";

function TeamPlayers(team, auth, setError) {
  console.log(team);
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
      console.log(data);
    })

    .catch((err) => {
      // all messages are recieved from back-end but in case there isn't one (f.e. server is down) using or operator to send one.
      setError({ status: true, msg: err || "server error", color: "error" });
    });
}

function Team() {
  const auth = useContext(AuthContext);
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {data.msg && (
                <>
                  <S.P>{data.msg}</S.P>
                </>
              )}

              <S.FlexBlock>
                {data.length > 0 &&
                  data.map((x, i) => (
                    <Button
                      key={i}
                      handleClick={() => {
                        TeamPlayers({ name: x.team_name }, auth, setError);
                      }}
                    >
                      {x.team_name}
                    </Button>
                  ))}
                <Button>PLUS</Button>
              </S.FlexBlock>
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
