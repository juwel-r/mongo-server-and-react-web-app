import { Link, useLoaderData } from "react-router-dom";

const Update = () => {
  const user = useLoaderData();
  const formHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const updatedUser = { name, email };
    console.log(updatedUser);
    fetch(`http://localhost:5000/user/${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {console.log(data);
        if(data.modifiedCount>0){
           alert("User updated successfully")
        }
      });
  };
  return (
    <div>
      <p>
        Update information of <strong>{user.name}</strong>
      </p>
      <form onSubmit={formHandler}>
        <input type="text" name="name" defaultValue={user.name} /> <br />
        <input type="text" name="email" defaultValue={user.email} /> <br />
        <input type="submit" value="update" />
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Update;
