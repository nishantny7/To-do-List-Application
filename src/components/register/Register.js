import { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import "./Register.css";

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
      <h1 className="register-text">Register to make your to-do list</h1>
      <form onSubmit={submitHandler} className="register-form">
        <input
          type="text"
          onChange={(e) => setRegisterName(e.target.value)}
          className="name"
          align="center"
          placeholder="Name"
        />
        <input
          type="text"
          onChange={(e) => setRegisterEmail(e.target.value)}
          className="email"
          align="center"
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
          className="password"
          align="center"
          placeholder="Password"
        />

        <div>
          <button type="submit" className="register-button" align="center">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
