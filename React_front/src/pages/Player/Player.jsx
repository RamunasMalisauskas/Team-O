import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Section, Button, Input, Notification } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./Player.Styled";
import logoImg from "../../assets/logo.svg";

// FETCH/POST function to add player to database
// ir uses three props "player" (object selected from first form) ->
// -> "auth" (getting it from context) and setError(hook is used to calling notification) ->
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

function Player() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState();
  //  error has status for hidden/visible function, msg for notification text, and color to set notification to error or regular style
  const [error, setError] = useState({ status: false, msg: "", color: "" });
  //  player has name for the AddPlayer funcion id for RemovePlayer and status for component functionality
  const [player, setPlayer] = useState({ status: false, name: "", id: "" });

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
                    X
                  </Button>
                </S.ButtonBlock>
              </S.InputBlock>
            )}
          </form>

          <S.Frame>
            {/* is allways displayed untill is rewriten with data.msg or data */}
            {!data && <S.Subtitle>server error</S.Subtitle>}

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {data && (
                <Button
                  sticky={true}
                  color="primary"
                  handleClick={(e) => console.log(data)}
                >
                  ADD TO MY TEAM
                </Button>
              )}

              {/* validating if data is array and then maping */}
              {data &&
                data.map((x, i) => (
                  <S.TableButtonBlock key={i}>
                    <Input
                      type="radio"
                      handleChange={(e) =>
                        setPlayer({
                          name: e.target.value,
                          id: x.id,
                        })
                      }
                      radio={[{ value: x.name, label: x.name }]}
                    />
                    <Button
                      type="submit"
                      handleClick={(e) =>
                        RemovePlayer(player, auth, setError, setData)
                      }
                    >
                      X
                    </Button>
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

export default Player;
