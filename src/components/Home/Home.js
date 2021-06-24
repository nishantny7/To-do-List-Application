import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Redirect, useLocation, useHistory } from "react-router-dom";

//Import components
import Form from "../Form";
import TodoList from "../TodoList";
import PopUp from "../popup/PopUp";

function Home(props) {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [popUpState, setPopUpState] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({
    _id: "",
    text: "",
  });
  const history = useHistory();

  useEffect(() => {
    getTodosFromDB();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;

      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;

      default:
        setFilteredTodos(todos);
    }
  };

  const getTodosFromDB = async () => {
    // if (localStorage.getItem("todos") === null) {
    //     localStorage.setItem("todos", JSON.stringify([]))
    // } else {
    //     let localTodos = JSON.parse(localStorage.getItem("todos"))
    //     setTodos(localTodos)
    // }

    const response = await axios.get(
      "/todos",
      {
        headers: {
          "auth-token": props.authToken,
        },
      },
      {
        crossdomain: true,
      }
    );

    //console.log(response, response.data.todos);
    let savedTodos = response.data.todos;
    setTodos(savedTodos);
    //console.log(todos);
  };

  const logoutHandler = (e) => {
    props.setAuthToken("");
    history.push("/");
  };

  return (
    <div className="App">
      <header>
        <button className="logout-button" onClick={logoutHandler}>
          Log out
        </button>
        <h1 align="center">{props.userDetails.name}'s To-Do List</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
        authToken={props.authToken}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filterHandler={filterHandler}
        filteredTodos={filteredTodos}
        authToken={props.authToken}
        setPopUpState={setPopUpState}
        setPopUpInfo={setPopUpInfo}
      />
      <div>
        {popUpState ? (
          <PopUp
            setPopUpState={setPopUpState}
            popUpInfo={popUpInfo}
            todos={todos}
            setTodos={setTodos}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Home;
