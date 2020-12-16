import React, { useEffect, useState, useContext } from "react";
import { Section } from "../../components/";
import { AuthContext } from "../../contexts/AuthContext";

function Home() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState();

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
      <Section>{!data && "no players in database"}</Section>
      <Section>
        <table>
          <thead>
            {data && (
              <tr>
                <th>player name</th>
              </tr>
            )}
          </thead>
          <tbody>
            {data &&
              data.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Section>
    </>
  );
}

export default Home;
