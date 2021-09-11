const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: '*' } });

require("dotenv").config();

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('message' , msg);
  });
});


server.listen(port, () => console.log(`Running on ${port}`));