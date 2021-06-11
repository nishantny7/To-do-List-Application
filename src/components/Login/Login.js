import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Redirect, useLocation, useHistory } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  const history = useHistory();

  const loginUser = async (credentials) => {
    const response = await axios.post(
      "http://localhost:8888/auth/login",
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        crossdomain: true,
      }
    );

    if (response.status === 400) {
      return "";
    } else {
      const token = response.headers["auth-token"];
      console.log(token);
      return token;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });

    props.setAuthToken(token);

    if (token !== "") {
      console.log("yes");
      //return <Redirect to={state?.from || "/"} />;
      history.push("/home");
    }
  };

  return (
    <div className="Login">
      <h1>Login to view your to-do list</h1>
      <form onSubmit={submitHandler}>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
