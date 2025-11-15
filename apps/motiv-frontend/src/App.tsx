import axios from "axios";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const { data } = await axios.get("/api/get-all");
        setUsers(data);
      }
      catch (error) {
        console.error(error);
      }
    }
    loadUsers();
  }, []);

  return (
    <>
      <h1>Users</h1>
      {users && users.map((user: { name: string; email: string }) => (
        <div key={user.name}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
}

export default App;
