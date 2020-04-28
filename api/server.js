const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const restricted=require("../auth/restricted-middleware")



const server = express();
const usersRouter = require('../users/users-router.js');
const authRouter=require("../auth/auth-router")


server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', restricted, usersRouter);
server.use('/api/auth',  authRouter)

server.get('/', (req, res) => {
    res.send("It's alive!");
  });
  
  module.exports = server;