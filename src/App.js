import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/users`).then((res) => {
      setData(res.data.users);
    });
  }, []);

  const addUser = () => {
    axios
      .post(`http://localhost:8080/users`, {
        firstName: firstname,
        lastName: lastname,
        email,
      })
      .then((res) => {
        axios.get(`http://localhost:8080/users`).then((res) => {
          setData(res.data.users);
        });
      })
      .catch((e) => console.log(e));
  };

  const Search = () => {
    var users = [];
    data.map((user) => {
      if (
        user.firstName == search ||
        user.lastName == search ||
        user.email == search
      ) {
        users.push(user);
      }
    });
    setData(users);
  };
  return (
    <div>
      <form>
        <div>
          <label>FirstName:</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>LastName:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </form>
      <button onClick={addUser}>Create</button>
      <div>
        <label>Search:</label>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={Search}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
          </tr>
        </thead>
        {/* {data.length != 0 ? ( */}
        <tbody>
          {console.log(data)}
          {data.map((user, key) => {
            return (
              <tr key={key}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
        {/* ) : (
          <tr></tr>
        )} */}
      </table>
    </div>
  );
}

export default App;
