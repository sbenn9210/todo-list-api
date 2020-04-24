var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
  {
    id: 1,
    todo: "Implement a REST API",
  },
  {
    id: 2,
    todo: "Implement a REST API",
  },
  {
    id: 4,
    todo: "Implement a REST API",
  },
  {
    id: 5,
    todo: "Implement a REST API",
  },
];

// GET /api/todos

app.get("/api/todos", (req, res) => {
  res.send(todoList);
});

// GET /api/todos/:id

app.get("/api/todos/:id", (req, res) => {
  let requestedItem = todoListFind(todoList, req.params.id);
  res.send(requestedItem);
});

// POST /api/todos

app.post("/api/todos", (req, res) => {
  res.send(todoList);
});

// PUT /api/todos/:id

app.put("/api/todos/:id", (req, res) => {
  let replaced = todoReplace(todoList, req.params, req.body);
  res.send(replaced);
});

// DELETE /api/todos/:id

app.delete("/api/todos/:id", (req, res) => {
  let id = req.params.id;
  todoList = todoList.filter((todo) => id != todo.id);
  res.send(todoList);
});

app.listen(3000, function () {
  console.log("Todo List API is now listening on port 3000...");
});

function todoListFind(list, param) {
  return list.filter((item) => {
    if (item.id == param) {
      return item;
    }
  });
}

function todoReplace(list, param, body) {
  let parameter = parseInt(param.id);
  return list.map((todo) =>
    todo.id === parameter ? (list[todo] = body) : todo
  );
}
