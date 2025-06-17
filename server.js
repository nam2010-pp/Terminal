const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const pty = require("node-pty");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
  const shell = pty.spawn("bash", [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  shell.on("data", data => {
    socket.emit("output", data);
  });

  socket.on("input", input => {
    shell.write(input);
  });

  socket.on("resize", ({ cols, rows }) => {
    shell.resize(cols, rows);
  });

  socket.on("disconnect", () => {
    shell.kill();
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log("✅ Terminal ready at http://localhost:8080");
});
