const router = require("express").Router();
const Todo = require("../models/Todo");
const verify = require("./verifyToken");

router.post("/todos", verify, async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    owner: req.user._id,
  });

  try {
    const savedTodo = await todo.save();
    res.send(savedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/todos", verify, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user._id });
    res.status(200).send({ todos: todos });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/todos/:todoId", verify, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.todoId,
    });

    if (!todo) {
      res.status(404).send();
    }

    todo["completed"] = req.body["completed"];

    const updatedTodo = await todo.save();

    res.status(200).send(updatedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/todos/:todoId", verify, async (req, res) => {
  try {
    const removedTodo = await Todo.findByIdAndDelete(req.params.todoId);

    if (!removedTodo) {
      res.status(404).send();
    } else {
      res.status(200).send(removedTodo);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
