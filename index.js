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

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Leonore' },
];

console.log('Users:', users);

app.get('/users', (req, res) => {
  res.json(users);
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
