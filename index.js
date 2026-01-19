const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// JSONデータを扱うためのミドルウェア
app.use(express.json());

// CORSの設定
const corsOptions = {
  origin: 'http://localhost:5173',  // 特定のドメインのみ許可
  optionsSuccessStatus: 200 // レガシーブラウザ対応
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

let TodoList = [
  { id: 1768729110260, title: 'sample01', status: 'Open', person: 'User1', priority: 1 },
  { id: 1768729110262, title: 'sample02', status: 'Open', person: 'User2', priority: 1 },
];

app.get('/todos', (req, res) => {
  res.json(TodoList);
});

app.get('/todosbykw/', (req, res) => {
  res.json(TodoList);
});

app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = TodoList.find(u => u.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('Todoが見つかりません');
  }
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: TodoList.length + 1,
    title: req.body.title,
    status: req.body.status,
    person: req.body.person,
    priority: req.body.priority,
  };
  TodoList.push(newTodo);
  res.status(201).json(newTodo);
});


app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = TodoList.find(u => u.id === id);
  if (todo) {
    todo.title = req.body.title;
    todo.status = req.body.status;
    todo.person = req.body.person;
    todo.priority = req.body.priority;
    res.json(todo);
  } else {
    res.status(404).send('Todoが見つかりません');
  }
});


app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  TodoList = TodoList.filter(u => u.id !== id);
  res.status(204).send();
});
