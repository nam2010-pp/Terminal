const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const pty = require("node-pty");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  const term = pty.spawn("bash", [], {
    name: "xterm-color",
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env,
  });

  term.on("data", (data) => socket.emit("output", data));
  socket.on("input", (data) => term.write(data));
  socket.on("disconnect", () => term.kill());
});

server.listen(process.env.PORT || 3000, () => {
  console.log("🌐 Web terminal running on port", process.env.PORT || 3000);
});
