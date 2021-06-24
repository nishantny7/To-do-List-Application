import "./PopUp.css";
import { useState } from "react";
import axios from "axios";

function PopUp({ setPopUpState, popUpInfo, todos, setTodos }) {
  const [inputFieldText, setInputFieldText] = useState(popUpInfo.text);

  const updateHandler = async (e) => {
    e.preventDefault();
    //console.log(popUpInfo._id);
    const response = await axios.patch(`/todos/${popUpInfo._id}`, {
      text: inputFieldText,
    });

    if (response.status === 200) {
      setTodos(
        todos.map((todo) => {
          if (popUpInfo._id === todo._id) {
            todo.text = inputFieldText;
            return todo;
          }
          return todo;
        })
      );
    } else if (response.status === 404) {
      console.log("No todo with this id in DB");
    } else {
      console.log(response.data);
    }

    setPopUpState(false);
  };

  const inputfieldTextHandler = (e) => {
    setInputFieldText(e.target.value);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <form className="update-todo-form" onSubmit={updateHandler}>
          <input
            className="text-input"
            type="text"
            value={inputFieldText}
            onChange={inputfieldTextHandler}
          />
          <button className="update-btn" type="submit">
            Update
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              setPopUpState(false);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopUp;
