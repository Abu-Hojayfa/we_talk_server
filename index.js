const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

require("dotenv").config();

app.use(express.json());
app.use(cors());

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Boss:hemal001@cluster0.pec8g.mongodb.net/we-talk?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("we-talk").collection("testing");

  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      collection.insertOne({ msg: msg });
    });

    socket.on("get message", () => {
      collection.find({}).toArray((err, mssgs) => {
        io.emit("message", mssgs);
      });
    });
  });
});

server.listen(port, () => console.log(`Running on ${port}`));
