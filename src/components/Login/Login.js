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
    const response = await axios
      .post(
        "/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          crossdomain: true,
        }
      )
      .then((response) => {
        const token = response.headers["auth-token"];
        const userDetails = response.data.currentUser;
        props.setUserDetails(userDetails);
        props.setAuthToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user-details", JSON.stringify(userDetails));

        if (token !== "") {
          //return <Redirect to={state?.from || "/"} />;
          history.push("/home");
        }
      })
      .catch((error) => {
        return <div>{alert(error.response.data)}</div>;
      });

    // if (response.status === 400) {
    //   alert(response.data);
    // } else {
    //   const token = response.headers["auth-token"];
    //   props.setUserDetails(response.data.currentUser);
    //   props.setAuthToken(token)

    //   if (token !== "") {
    //     //console.log("yes");
    //     //return <Redirect to={state?.from || "/"} />;
    //     history.push("/home");
    //   }
    //   //console.log(response.data);
    //   return token;
    // }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser({
      email,
      password,
    });

    // props.setAuthToken(token);

    // if (token !== "") {
    //   //console.log("yes");
    //   //return <Redirect to={state?.from || "/"} />;
    //   history.push("/home");
    // }
  };

  return (
    <div className="Login">
      <p className="login-text" align="center">
        Login to view your to-do list
      </p>
      <form onSubmit={submitHandler} className="login-form">
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="email"
          align="center"
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="password"
          align="center"
          placeholder="Password"
        />
        <div>
          <button type="submit" className="login-button" align="center">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
