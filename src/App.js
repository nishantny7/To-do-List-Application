import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login.js";
import Front from "./components/front/Front";
import Register from "./components/register/Register";

function App() {
  //const storedToken = localStorage.getItem("token");
  const storedUserDetails = JSON.parse(localStorage.getItem("user-details"));
  const [authToken, setAuthToken] = useState("");
  const [userDetails, setUserDetails] = useState(storedUserDetails || {});

  async function verifyAuthentication() {
    axios
      .get("/loggedIn", {
        crossdomain: true,
      })
      .then((response) => {
        console.log(response.data, response.status);
        if (response.status === 200) {
          return true;
        }
        return false;
      })
      .catch((err) => {
        return false;
      });
  }

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          //return authToken === "" ? (
          return verifyAuthentication() === false ? (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          ) : (
            //return authToken === "" ? <Redirect to="/login" />
            children
          );
        }}
      />
    );
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Front />
          </Route>
          <PrivateRoute path="/home">
            <Home
              authToken={authToken}
              userDetails={userDetails}
              setAuthToken={setAuthToken}
            />
          </PrivateRoute>
          {/* <Route path="/login" render={props => (
                        <Login {...props} setAuthToken={setAuthToken} authToken={authToken} />
                    )} /> */}
          <Route exact path="/register">
            <Register />
          </Route>
          <Route>
            <Login
              setAuthToken={setAuthToken}
              setUserDetails={setUserDetails}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
