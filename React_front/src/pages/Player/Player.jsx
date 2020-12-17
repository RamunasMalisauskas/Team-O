import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Player.Styled";
import logoImg from "../../assets/logo.svg";

function Player() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/players", {
      headers: {
        Authorization: `${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <S.PageBackground />

      <Section
        center={true}
        background={(props) => props.theme.secondary.background}
      >
        <S.Block>
          <S.Title>PLAYERS</S.Title>

          <S.Table>
            {!data && <S.Subtitle>no players in database</S.Subtitle>}
            <thead>
              {data && (
                <S.TR>
                  <S.TH>PLAYER NAME</S.TH>
                </S.TR>
              )}
            </thead>
            <tbody>
              {data &&
                data.map((player) => (
                  <S.TR key={player.id}>
                    <S.TD>{player.name}</S.TD>

                    <S.ButtonBlock>
                      <Button size="small"> add to my team</Button>
                      <Button size="small"> delete</Button>
                    </S.ButtonBlock>
                  </S.TR>
                ))}
            </tbody>
          </S.Table>
        </S.Block>
      </Section>

      <Link to="/">
        <S.Logo src={logoImg} alt="teamo logo" />
      </Link>
    </>
  );
}

export default Player;
