import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FormTemplate, Section, Notification } from "../../components/";
import regFormData from "../../utils/RegFormData";

function Login(fieldValues, auth, setError) {
  fetch("http://localhost:8081/register", {
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
        setError({
          status: true,
          msg: data.msg,
          color: "" || "registry completed",
        });
      } else {
        setError({
          status: true,
          color: "error",
          msg: data.msg || "input error",
        });
      }
    })
    .catch((err) => {
      setError({ status: true, color: "error", msg: "server error" });
      console.log(err);
    });
}

function LoginPage() {
  const auth = useContext(AuthContext);
  const [error, setError] = useState({
    status: false,
    color: "",
    msg: "",
  });

  return (
    <>
      <Section>
        {error.status && (
          <Notification
            notificationMessage={error.msg}
            handleClick={() => setError({ status: false })}
            color={error.color}
          />
        )}

        <h1>register</h1>

        <FormTemplate
          callback={(fieldValues) => Login(fieldValues, auth, setError)}
          fields={regFormData}
          buttonText="Register"
          buttonType="submit"
        />
      </Section>
    </>
  );
}

export default LoginPage;
