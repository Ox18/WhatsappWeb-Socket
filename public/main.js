var chat = {};
var socket = io.connect("http://localhost:8080", { forceNew: true });

function insertQR(uri) {
  document.querySelector("#qr_code").innerHTML = `<img src="${uri}" alt="qr" />`
}

socket.on("messages", function (uri) {
  insertQR(uri);
});

socket.on("initialChat", function (chatData) {
  chat = chatData;
  const listChat = Object.keys(chat);
  document.querySelector("#list-chat").innerHTML = "";
  const chatLista = document.createElement("div");
  listChat.map((number)=>{
    const chatBox = document.createElement("div");
    chatBox.classList.add("chat-box-class");
    chatBox.innerHTML = number;
    chatBox.addEventListener("click", function(){
      document.querySelector("#chat").innerHTML = "";
      const { conversation } = chat[number];
      conversation.map(({ message, type})=>{
        let chatBloque = document.createElement("div");
        chatBloque.classList.add("chat_bloque");
        chatBloque.classList.add(type === "client"? "chat_bloque_msg_client":"chat_bloque_msg_me");
        let chatMessage = document.createElement("div");
        chatMessage.classList.add("client_message");
        chatMessage.classList.add(type === "client"? "msg_client":"msg_me");
        chatMessage.innerText = message;


        chatBloque.appendChild(chatMessage);
        document.querySelector("#chat").appendChild(chatBloque);
      });
    })

    chatLista.appendChild(chatBox);

  });
  document.querySelector("#list-chat").appendChild(chatLista);
});

socket.on("onReady", function(){
  alert("READY");
})