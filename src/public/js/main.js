$(function () {
  var GLOBAL_CHAT_ID = null;
  var GLOBAL_MESSAGES = [];
  var QR = null;
  // socket.io client side connection
  const socket = io.connect();

  // obtaining DOM elements from the Chat Interface
  const $messageForm = $("#message-form");
  const $messageBox = $("#message");
  const $chat = $("#chat");
  const $qr = $("#qr");
  const $containerqr = $("#container-qr");

  $messageBox.prop("disabled", true);

  // obtaining the usernames container DOM
  const $users = $("#usernames");
  document.querySelector("#contentWrap").style.display = "flex";

  const loadQR = () => {
    if (QR === null) {
      $qr.html(
        "<img width=205 src='https://acegif.com/wp-content/uploads/loading-36.gif' alt='QR Code' />"
      );
    } else if (QR === "authenticated") {
      $containerqr.hide();
    } else if (QR === "exceed") {
      alert("Excedido");
    } else {
      $qr.html("<img width=205 src='" + QR + "' alt='QR Code' />");
    }
  };

  loadQR();

  const ClearChat = () => {
    $chat.empty();
  };

  const LoadMessagesByIdChat = (id) => {
    ClearChat();
    const messagesByFilter = GLOBAL_MESSAGES.filter(
      (message) => message.chatID === id
    );

    // order by data
    messagesByFilter.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    for (let i = messagesByFilter.length - 1; i >= 0; i--) {
      displayMsg(messagesByFilter[i]);
    }
  };

  // events
  $messageForm.submit((e) => {
    e.preventDefault();
    if ($messageBox.val().length > 0 && GLOBAL_CHAT_ID) {
      const data = {
        chatID: GLOBAL_CHAT_ID,
        message: $messageBox.val(),
      };
      socket.emit("send message", data, (data) => {
        $chat.append(`<p class="error">${data}</p>`);
      });
      $messageBox.val("");
    }
  });

  socket.on("new qr", (data) => {
    QR = data;
    loadQR();
  });

  socket.on("new message", (data) => {
    GLOBAL_MESSAGES = [...GLOBAL_MESSAGES, data];
    LoadMessagesByIdChat(GLOBAL_CHAT_ID);
  });

  socket.on("whisper", (data) => {
    console.log(data);
  });

  socket.on("load old msgs", (msgs) => {
    GLOBAL_MESSAGES = msgs;
    if (GLOBAL_CHAT_ID) {
      for (let i = msgs.length - 1; i >= 0; i--) {
        displayMsg(msgs[i]);
      }
    }
  });

  socket.on("load old chats", (data) => {
    $users.html("");
    for (i = 0; i < data.length; i++) {
      const { author, id } = data[i];
      const chat = document.createElement("div");
      chat.addEventListener("click", () => {
        GLOBAL_CHAT_ID = id;
        LoadMessagesByIdChat(id);
        $messageBox.prop("disabled", false);
      });
      chat.innerHTML = `<p><i class="fas fa-user"></i> ${author}</p>`;
      $users.append(chat);
    }
  });

  function displayMsg(data) {
    $chat.append(
      `<p class="p-2 bg-secondary w-75"><b>${data.author}</b>: ${data.message}</p>`
    );
    const chat = document.querySelector("#chat");
    chat.scrollTop = chat.scrollHeight;
  }
});
