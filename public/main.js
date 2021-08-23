var socket = io.connect("http://localhost:8080", { forceNew: true });

socket.on("messages", function (data) {
  document.querySelector("#qr_code").innerHTML = `
    <img src="${data}" alt="qr" />
  `
});
