const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);


app.use(express.static("./public"));
app.use(bodyParser.urlencoded());


let messages = []



app.get("/messages", (req, res) => {
  res.send(messages);
})

app.post("/messages", (req, res) => {
  messages.push(req.body);
  io.emit("message", req.body);
  res.sendStatus(200);
})

io.on("connection", (socket) => {
  console.log ("En idiot har precus anslut!!");
})


http.listen(3000, () => {
    console.log("Servern körs, Besök http://localhost:3000");
});