import React from "react";

//Import components
import Todo from "./Todo";
const TodoList = ({
  todos,
  setTodos,
  filterHandler,
  filteredTodos,
  authToken,
  setPopUpState,
  setPopUpInfo,
}) => {
  let prevDate = "";
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => {
          if (prevDate === todo.createdAt.slice(0, 10)) {
            return (
              <Todo
                key={todo._id}
                text={todo.text}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                authToken={authToken}
                id={todo._id}
                setPopUpState={setPopUpState}
                setPopUpInfo={setPopUpInfo}
              />
            );
          } else {
            prevDate = todo.createdAt.slice(0, 10);
            return (
              <div key={todo._id}>
                <p>{todo.createdAt.slice(0, 10)}</p>
                <Todo
                  text={todo.text}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  authToken={authToken}
                  id={todo._id}
                  setPopUpState={setPopUpState}
                  setPopUpInfo={setPopUpInfo}
                />
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default TodoList;
