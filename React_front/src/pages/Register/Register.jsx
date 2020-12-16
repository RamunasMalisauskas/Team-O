import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FormTemplate, Section, Notification } from "../../components/";
import LoginFormData from "../../utils/LoginFormData";

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

function RegPage() {
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
          callback={(fieldValues) => Reg(fieldValues, auth, setError)}
          fields={LoginFormData}
          buttonText="Register"
          buttonType="submit"
        />
      </Section>
    </>
  );
}

export default RegPage;
