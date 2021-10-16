var socket = io.connect("http://localhost", { forceNew: true });

socket.on("messages", function (data) {
  alert(data);
});

// escuchar socket.on("key", function(data){ });
// emitir socket.emit("key", { data: "value" });
