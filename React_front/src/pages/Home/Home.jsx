import React, { useEffect, useState, useContext } from "react";
import { Section } from "../../components/";
import { AuthContext } from "../../contexts/AuthContext";

function Home() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:8081/books", {
      headers: {
        Authorization: `${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <Section background="#ff7f50">welcome to React BoilerPlate</Section>
      <Section>{!data && "no books in database"}</Section>
      <Section>
        <table>
          <thead>
            {data && (
              <tr>
                <th>Author</th>
                <th>Title</th>
              </tr>
            )}
          </thead>
          <tbody>
            {data &&
              data.map((book) => (
                <tr key={book.id}>
                  <td>{book.author}</td>
                  <td>{book.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Section>
    </>
  );
}

export default Home;
