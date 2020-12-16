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
      <Section>
        {/* notification is shown depending on error status and changed with hooks */}
        {error.status && (
          <Notification
            notificationMessage={error.msg}
            handleClick={() => setError({ status: false })}
            color={error.color}
          />
        )}

        <h1>register</h1>

        <FormTemplate
          // Form component uses callback function to execute submit function
          // also uses data from ulits folder to create form
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
