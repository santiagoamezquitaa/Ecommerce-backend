const socket = io();

let user = "";
const inputChat = document.getElementById("inputChat");
const formChat = document.getElementById("formChat");

Swal.fire({
  title: "Identificate!",
  input: "text",
  text: "Ingresa un nombre de usuario.",
  inputValidator: (value) => {
    return !value && "Necesitas un nombre de usuario para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

formChat.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (inputChat.value.trim().length > 0) {
    socket.emit("message", { user: user, message: inputChat.value });
    formChat.reset();
  }
});

socket.on("messagesLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages =
      messages + `<Strong>${message.user}:</Strong> ${message.message}</br>`;
  });
  log.innerHTML = messages;
});
