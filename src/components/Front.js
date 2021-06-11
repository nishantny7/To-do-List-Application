import { Link } from "react-router-dom";

function Front() {
  return (
    <div>
      <h1>
        <Link to="/login">Log in</Link>
      </h1>
    </div>
  );
}

export default Front;
