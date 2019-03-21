// code away!

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRouter = require("./users/router");
const postsRouter = require("./posts/router");

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/posts", postsRouter);


server.use("/api/users", usersRouter);

server.use("/", (req, res) => res.send("API is Activaited and Ready to GO!"));



server.listen(4000, () => console.log("API running on  port 7000"));
