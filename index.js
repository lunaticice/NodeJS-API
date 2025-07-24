const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: '*', // Adjust this to your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    age: 25,
    role: 'editor',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    age: 32,
    role: 'viewer',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    age: 30,
    role: 'admin',
  },
];

console.log('Users:', users);

app.get('/users', (req, res) => {
  res.json({
    success: true,
    count: users.length,
    users: users,
  });
});

app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.status(201).json(user);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
