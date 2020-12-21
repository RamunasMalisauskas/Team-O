import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FormTemplate, Section, Notification, Button } from "../../components/";
import regFormData from "../../utils/RegFormData";
import logoImg from "../../assets/logo.svg";
import * as G from "../../themes/Global.styled";
import backImg from "../../assets/loginImg.jpg";

function Reg(fieldValues, auth, setError) {
  fetch(`${process.env.REACT_APP_NODE_ROUTES}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: fieldValues.email,
      password: fieldValues.password,
      password2: fieldValues.password2,
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
      <G.PageBackground backImg={backImg} />

      <Section
        center={true}
        background={(props) => props.theme.support.background}
      >
        {/* notification is shown depending on error status and changed with hooks */}

        <G.Block>
          {error.status && (
            <G.ErrorBlock>
              <Notification
                notificationMessage={error.msg}
                // button handler turns of notification
                handleClick={() => setError({ status: false })}
                color="error"
              />
            </G.ErrorBlock>
          )}

          <G.Title>REGISTER</G.Title>

          <FormTemplate
            // Form component uses callback function to execute submit function
            // also uses data from ulits folder to create form
            callback={(fieldValues) => {
              Reg(fieldValues, auth, setError);
              setError({ status: false });
            }}
            fields={regFormData}
            buttonText="REGISTER"
            buttonType="submit"
          />
        </G.Block>

        <G.ButtonBlock>
          <Link to="/login">
            <Button color="support">LOGIN</Button>
          </Link>

          <Link to="/">
            <Button>BACK</Button>
          </Link>
        </G.ButtonBlock>
      </Section>

      <Link to="/">
        <G.BigLogo src={logoImg} alt="teamo logo" />
      </Link>
    </>
  );
}

export default RegPage;
