const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

let tasks = [
  {
    id: 1,
    name: "first task",
    completed: true,
  },
  {
    id: 2,
    name: "Second task",
    completed: false,
  },
  {
    id: 3,
    name: "Third task",
    completed: true,
  },
];

app.get("/api/v1/tasks", (req, res) => {
  res.status(202).send(tasks);
});

app.get("/api/v1/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  console.log(taskId);
  for (let i = 0; i < tasks.length; i++) {
    if (taskId === tasks[i].id) {
      res.status(202).send(tasks[i]);
      return;
    }
  }
  res.status(404).send("The Task With Provided Id doesnot exits");
});

app.post("/api/v1/newTask", (req, res) => {
  const { id, name, completed } = req.body;
  if (!id || !name || !completed) {
    res.status(400).send("the bad request for task ");
    return;
  }
  const newTask = {
    id,
    name,
    completed,
  };

  tasks.push(newTask);
  res.status(202).json(newTask);
});

app.put("/api/v1/task/:id", (req, res) => {
  const TaskId = parseInt(req.params.id);
  const { name, completed } = req.body;

  for (let i = 0; i < tasks.length; i++) {
    if (TaskId === tasks[i].id) {
      if (name) {
        tasks[i].name = name;
      }
      if (completed !== null) {
        tasks[i].completed = completed;
      }
      res.status(202).json(tasks[i]);
      return;
    }
  }
  res.status(404).send("there is no task with provided id");
});

app.delete("/api/v1/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  for (let i = 0; i < tasks.length; i++) {
    if (taskId === tasks[i].id) {
      const task = tasks[i];
      tasks = tasks.filter((task) => taskId !== task.id);
      res.status(200).json(task);
      return;
    }
  }

  res.status(404).send("there is no task with provided id");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT} ... `);
});

module.exports = app;
