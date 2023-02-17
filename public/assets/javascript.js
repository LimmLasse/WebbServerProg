const chatbox = document.getElementById("chatbox");
const input = document.getElementById("input");
const send = document.getElementById("send");

let socket = io();

socket.on("message", sendMessage);

getMessages();


//send.addEventListener("click", sendMessage);
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const message = input.value;
    input.value = ""; // clear the input field
    postMessage({message});
  }
});


function postMessage(message) {
  $.post("http://localhost:3000/messages", message);
}

function getMessages(){
  $.get("http://localhost:3000/messages", (data) => {
    data.forEach(sendMessage);
  })
}

function sendMessage(message) {
  const newMessage = document.createElement("p");
  newMessage.textContent = message.message;
  chatbox.appendChild(newMessage);

  chatbox.scrollTop = chatbox.scrollHeight;
}
