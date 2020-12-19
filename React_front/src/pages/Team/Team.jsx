import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Team.Styled";
import logoImg from "../../assets/logo.svg";

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
            {data.msg && (
              <>
                <S.P>{data.msg}</S.P>
              </>
            )}

            {data.length > 0 &&
              data.map((x, i) => (
                <Button
                  key={i}
                  handleClick={() => setTeamData({ name: x.team_name })}
                >
                  {x.team_name}
                </Button>
              ))}
            <Button> PLUS</Button>
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
