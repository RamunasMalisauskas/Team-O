import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Player.Styled";
import logoImg from "../../assets/logo.svg";

function AddPlayer(player, auth, setError) {
  fetch("http://localhost:8080/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${auth.token}`,
    },
    body: JSON.stringify({
      name: player.name,
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
    .catch((err) => {
      setError({ status: true, msg: err || "server error", color: "error" });
    });
}

function Player() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState();
  const [error, setError] = useState({ status: false, msg: "", color: "" });
  const [player, setPlayer] = useState({ status: false, name: "" });

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
              <Button handleClick={() => setPlayer({ status: true })}>
                ADD PLAYER
              </Button>
            </S.InputBlock>

            {player.status && (
              <S.InputBlock>
                <Input
                  placeholder="enter new players name"
                  handleChange={(e) =>
                    setPlayer({ name: e.target.value, status: true })
                  }
                />
                <S.ButtonBlock>
                  <Button
                    color="primary"
                    type="submit"
                    handleClick={(e) => {
                      AddPlayer(player, auth, setError);
                    }}
                  >
                    SAVE
                  </Button>
                  <Button
                    handleClick={() => {
                      setPlayer({ status: false });
                    }}
                  >
                    X
                  </Button>
                </S.ButtonBlock>
              </S.InputBlock>
            )}
          </form>

          <S.Frame>
            {!data && <S.Subtitle>no players in database</S.Subtitle>}

            {data &&
              data.map((x) => (
                <S.TableButtonBlock>
                  <Input
                    type="checkbox"
                    handleChange={(e) => console.log(e.target.value)}
                    checkbox={[{ value: x.name, label: x.name }]}
                  />
                  <Button>X</Button>
                </S.TableButtonBlock>
              ))}
          </S.Frame>
        </S.Block>
      </Section>

      <Link to="/">
        <S.Logo src={logoImg} alt="teamo logo" />
      </Link>
    </>
  );
}

export default Player;
