import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Redirect, useLocation, useHistory } from "react-router-dom";

//Import components
import Form from "../Form";
import TodoList from "../TodoList";

function Home(props) {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
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
        <h1>{props.userDetails.name}'s To-Do List</h1>
        <button onClick={logoutHandler}>Log out</button>
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
      />
    </div>
  );
}

export default Home;
