import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Team.Styled";
import logoImg from "../../assets/logo.svg";

function Team() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState({});
  const [error, setError] = useState({ status: false, msg: "", color: "" });

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

          <S.Frame></S.Frame>
        </S.Block>
      </Section>

      <Link to="/">
        <S.Logo src={logoImg} alt="teamo logo" />
      </Link>
    </>
  );
}

export default Team;
