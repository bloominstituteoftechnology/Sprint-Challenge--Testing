require("dotenv").config();
const axios = require('axios');
const bcrypt = require('bcryptjs');


// add jsonwebtoken library
const jwt = require("jsonwebtoken");

const { authenticate } = require('../auth/authenticate');
const db = require('./routes-model')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);  // 2 ^ 14th
    user.password = hash;
    const data = await db.add(user);
    res.status(201).json({ data,  message: "User successfully created!"  });
    
  } catch (err) {
    res.status(500).json({ err });
  }
}


async function login(req, res) {
  // implement user login
  try {
    const body = req.body;
    const user = await db.get(body.username);
      if (user && bcrypt.compareSync(body.password, user.password)) {
        const token = generateToken(user);
        res
          .status(202)
          .json({ message: "Logged in successfully", token: token });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    
  } catch (err) {
    res.status(500).json({ err });
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '2h'
  };

  return jwt.sign(payload, secret, options);
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
