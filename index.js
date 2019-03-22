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

// want port number to be what ever herokuu gives us if not avaibilite
// then use port 7000
const PORT = process.env.PORT || 7000


server.listen(4000, () => console.log("API running on  port 7000"));
