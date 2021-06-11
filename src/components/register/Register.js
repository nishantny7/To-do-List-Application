import { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

function Register() {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const history = useHistory();

  const registerUser = async (credentials) => {
    axios
      .post(
        "http://localhost:8888/auth/register",
        {
          name: credentials.registerName,
          email: credentials.registerEmail,
          password: credentials.registerPassword,
        },
        {
          crossdomain: true,
        }
      )
      .then((response) => {
        //history.push("/login");
        return <Redirect to="/login" />;
      })
      .catch((error) => {
        return <div>{alert(error.response.data)}</div>;
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser({
      registerName,
      registerEmail,
      registerPassword,
    });
  };

  return (
    <div className="Register">
      <h1>Register to make your to-do list</h1>
      <form onSubmit={submitHandler}>
        <label>
          <p>Name</p>
          <input
            type="text"
            onChange={(e) => setRegisterName(e.target.value)}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="text"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
