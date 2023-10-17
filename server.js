import 'dotenv/config'

import express from 'express'
import mongoose from 'mongoose'
import User from './models/User.js';
const app = express()
const port = 3001

/* mongoose.connect(process.env.DATABASE_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

console.log({mongo: process.env.DATABASE_URL_MONGOODB})
mongoose.connect(process.env.DATABASE_URL_MONGOODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

  app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});

app.put('/', (req, res) => {
  res.send('How are you?');
});

app.delete('/', (req, res) => {
  res.send('run on');
});

app.get('/users/:userId', (req, res) => {
  console.log(req.params);
  res.send(`im the user: ${req.params.userId}`);
});

app.get('/books/:books', (req, res) => {
  console.log(req.params);
  res.send(`im the user: ${req.params.boosk}`);
});

app.get('/search', (req, res) => {
  console.log(req.query);
res.send(`Im searching for ${req.query.name} and ${req.query.age}`);
});

app.get('/search/:id', (req, res) => {
  console.log(req.query);
  console.log (req.params.id);
  res.send(`Im searching for ${req.query.cellphone} and ${req.params.id}`);
});

app.get('/search/:searchId', (req, res) => {
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.post('/user', async (req, res) => {
  const { email, name, age } = req.body;

  try {
    const user = await User.create({ email, name, age });
    res.status(200).json({ message: 'User created successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})
