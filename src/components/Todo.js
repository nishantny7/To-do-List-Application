import axios from "axios";
import React from "react";

const Todo = ({
  text,
  todo,
  todos,
  setTodos,
  authToken,
  id,
  setPopUpState,
  setPopUpInfo,
}) => {
  const deleteHandler = async () => {
    const response = await axios.delete(`/todos/${todo._id}`, {
      headers: {
        "auth-token": authToken,
      },
    });

    if (response.status === 200) {
      setTodos(todos.filter((ele) => ele._id !== todo._id));
    } else if (response.status === 404) {
      console.log("No todo with this id in DB");
    } else {
      console.log(response.data);
    }

    //console.log(todo)
  };

  const completeHandler = async () => {
    const response = await axios.patch(
      `/todos/${todo._id}`,
      {
        completed: !todo.completed,
      },
      {
        headers: {
          "auth-token": authToken,
        },
      }
    );

    if (response.status === 200) {
      setTodos(
        todos.map((item) => {
          if (item._id === todo._id) {
            item.completed = !item.completed;
            return item;
          }
          return item;
        })
      );
    } else if (response.status === 404) {
      console.log("No todo with this id in DB");
    } else {
      console.log(response.data);
    }
    //console.log(todos);
  };

  const editHandler = async () => {
    //console.log("Loaded", id);
    setPopUpState(true);
    setPopUpInfo({ _id: id, text: text });
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {text}
      </li>
      <button onClick={editHandler} className="edit-btn">
        <i className="far fa-edit"></i>
      </button>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
