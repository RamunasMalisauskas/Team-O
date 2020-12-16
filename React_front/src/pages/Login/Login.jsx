import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FormTemplate, Section, Notification } from "../../components/";
import loginFormData from "../../utils/LoginFormData";
import { useState } from "react";

function Login(fieldValues, auth, history, setError) {
  fetch("http://localhost:8081/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: fieldValues.name,
      password: fieldValues.password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        auth.setToken("Bearer " + data.token);
        history.push("/");
      } else {
        setError({ status: true, msg: data.msg || "input error" });
      }
    })
    .catch((err) => {
      setError({ status: true, msg: "server error" });
      console.log(err);
    });
}

function LoginPage() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [error, setError] = useState({ status: false, msg: "error" });

  return (
    <>
      <Section>
        {error.status && (
          <Notification
            notificationMessage={error.msg}
            handleClick={() => setError({ status: false })}
            color="error"
          />
        )}
        <h1>login</h1>
        <FormTemplate
          callback={(fieldValues) =>
            Login(fieldValues, auth, history, setError)
          }
          fields={loginFormData}
          buttonText="Login"
          buttonType="submit"
        />
      </Section>
    </>
  );
}

export default LoginPage;
