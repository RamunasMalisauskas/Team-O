import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FormTemplate, Section, Notification, Button } from "../../components/";
import LoginFormData from "../../utils/LoginFormData";
import logoImg from "../../assets/logo.svg";
import * as S from "./Register.Styled";

function Reg(fieldValues, auth, setError) {
  fetch("http://localhost:8080/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: fieldValues.email,
      password: fieldValues.password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        // token with nessesery addon ("Bearer ") saved in context
        auth.setToken("Bearer " + data.token);
        // notification informs about successful registry
        setError({
          status: true,
          msg: data.msg,
          color: "" || "registry completed",
        });
      } else {
        // or displays error fetch from backend (data.msg)
        setError({
          status: true,
          color: "error",
          msg: data.msg || "input error",
        });
      }
    })
    .catch((err) => {
      setError({ status: true, color: "error", msg: "server error" });
    });
}

function RegPage() {
  const auth = useContext(AuthContext);
  const [error, setError] = useState({
    status: false,
    color: "",
    msg: "",
  });

  return (
    <>
      <S.PageBackground />

      <Section
        center={true}
        background={(props) => props.theme.support.background}
      >
        {/* notification is shown depending on error status and changed with hooks */}
        {error.status && (
          <S.ErrorBlock>
            <Notification
              notificationMessage={error.msg}
              // button handler turns of notification
              handleClick={() => setError({ status: false })}
              color="error"
            />
          </S.ErrorBlock>
        )}

        <S.Block>
          <S.Title>REGISTER</S.Title>

          <FormTemplate
            // Form component uses callback function to execute submit function
            // also uses data from ulits folder to create form
            callback={(fieldValues) => Reg(fieldValues, auth, setError)}
            fields={LoginFormData}
            buttonText="REGISTER"
            buttonType="submit"
          />
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

export default RegPage;
