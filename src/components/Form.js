import React from "react";
import axios from "axios";
const Form = ({
  todos,
  setTodos,
  inputText,
  setInputText,
  setStatus,
  authToken,
}) => {
  const inputTextHandler = (e) => {
    //console.log(e.target.value);
    setInputText(e.target.value);
  };

  const submitTodoHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:8888/todos",
      {
        text: inputText,
        completed: false,
      },
      {
        headers: {
          "auth-token": authToken,
        },
      },
      {
        crossdomain: true,
      }
    );
    //console.log(response);
    if (response.status === 400) {
      console.log(response.data.err);
    } else {
      setTodos([...todos, response.data]);
    }
    setInputText("");
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form onSubmit={submitTodoHandler} className="todo-form">
      <input
        onChange={inputTextHandler}
        type="text"
        value={inputText}
        className="todo-input"
      />
      <button className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
