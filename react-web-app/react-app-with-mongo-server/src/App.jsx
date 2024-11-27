import "./App.css";

function App() {
  const formHandler =(e)=>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    fetch('http://localhost:5000/user',{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(user)
    })
  }

  return (
    <>
      <h1>React-app-with-mongo-server</h1>
      <form onSubmit={formHandler}>
        <input type="text" name="name"/>
        <input type="text" name="email"/>
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
