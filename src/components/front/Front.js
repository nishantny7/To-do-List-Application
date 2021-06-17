import { Link } from "react-router-dom";
import "./Front.css";

function Front() {
  return (
    <div className="Front">
      <p className="front-text" align="center">
        To-do List
      </p>
      <Link to="/login">
        <button className="front-login" align="center">
          Log in
        </button>
      </Link>
      <Link to="/register">
        <button className="front-register" align="center">
          Register
        </button>
      </Link>
    </div>
  );
}

export default Front;
