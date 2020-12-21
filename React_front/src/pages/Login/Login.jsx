import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FormTemplate, Section, Notification, Button } from "../../components/";
import loginFormData from "../../utils/LoginFormData";
import logoImg from "../../assets/logo.svg";
import * as S from "./Login.Styled";

//  passing props to function
function Login(fieldValues, auth, history, setError) {
  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // posting values passed as props from form
      email: fieldValues.email,
      password: fieldValues.password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        // token with nessesery addon ("Bearer ") saved in context
        auth.setToken("Bearer " + data.token);
        // after token is successfuly added to context you are redirected to home page
        history.push("/");
      } else {
        setError({ status: true, msg: data.msg || "input error" });
      }
    })
    .catch((err) => {
      // if error occor it's shown in notification
      setError({ status: true, msg: "server error" });
    });
}

function LoginPage() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [error, setError] = useState({ status: false, msg: "error" });

  return (
    <>
      <S.PageBackground />

      <Section
        center={true}
        background={(props) => props.theme.secondary.background}
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
          <S.Title>LOGIN</S.Title>
          <FormTemplate
            // Form component uses callback function to execute submit function
            // also uses data from ulits folder to create form
            callback={(fieldValues) =>
              Login(fieldValues, auth, history, setError)
            }
            fields={loginFormData}
            buttonText="LOGIN"
            buttonType="submit"
          />
        </S.Block>

        <S.ButtonBlock>
          <Link to="/register">
            <Button color="primary">REGISTER</Button>
          </Link>

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

export default LoginPage;
