import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FormTemplate, Section, Notification, Button } from "../../components/";
import regFormData from "../../utils/RegFormData";
import { Reg } from "../../utils/Functions";
import logoImg from "../../assets/logo.svg";
import * as G from "../../themes/Global.styled";
import backImg from "../../assets/loginImg.jpg";

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
