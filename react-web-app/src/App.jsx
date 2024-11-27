import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  // get/read data
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  //ekhane "users" dependecy na dile update hobe na karon ami jokhon user add koreci tokhon (_id ) sarai state update hosse so,,,,,jehetu _id nei so state ar data newly map hosse na... tai newlly fetch korar jonno users k update kore then users k dependency kore deya hoice

  const formHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    //Create data
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, data]);
        console.log(data);
        form.reset();
      });
  };

  const deleteHandler = (id) => {
    fetch(`http://localhost:5000/user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Deleted Successfully!");
      });
  };

  return (
    <>
      <h1>React-app-with-mongo-server</h1>
      <h2>Express CRUD</h2>
      <form onSubmit={formHandler}>
      <h2>Add User Data</h2>

        <input type="text" name="name" />
        <br /> <input type="text" name="email" />
        <br />
        <input type="submit" />
      </form>
      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>_id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u._id}</td>
                <td>
                  <Link to={`/user/${u._id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={() => deleteHandler(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
