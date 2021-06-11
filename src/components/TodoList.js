import React from "react";

//Import components
import Todo from "./Todo";
const TodoList = ({
  todos,
  setTodos,
  filterHandler,
  filteredTodos,
  authToken,
}) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            key={todo._id}
            text={todo.text}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            authToken={authToken}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
