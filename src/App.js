import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login.js";
import Front from "./components/Front"

function App() {
    const [authToken, setAuthToken] = useState("");

    function PrivateRoute({ children, ...rest }) {
        return (
            <Route {...rest} render={({ location }) => {
                return authToken === "" ? <Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }} />
                    //return authToken === "" ? <Redirect to="/login" />
                    : children
            }} />
        )
    }

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Front />
                    </Route>
                    <PrivateRoute path="/home">
                        <Home authToken={authToken} />
                    </PrivateRoute>
                    {/* <Route path="/login" render={props => (
                        <Login {...props} setAuthToken={setAuthToken} authToken={authToken} />
                    )} /> */}
                    <Route>
                        <Login setAuthToken={setAuthToken} authToken={authToken} />
                    </Route>

                </Switch>
            </div>
        </Router>
    )
}
export default App;
