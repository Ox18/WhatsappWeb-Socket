const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

class SocketClient{
    constructor(io){
      this.io = io;
      this.client = new Client();
      this.qrURL = "";
      this.initialize();
    }
    
    initialize(){
            this.io.on("connection", this.onConnectionIO);
            this.client.on('authenticated', this.onAuthenticatedClient);
            this.client.on('message', this.onMessageClient);
            this.client.on('ready', this.onReadyClient);  
            this.client.on('qr', this.onQrClient);
            this.client.initialize();
    }
    
    // Here you put all the tasks when the user first connects to the web site
    onConnectionIO(socket){
        socket.on("new-message", this.onNewMessageIO);
    }
    
    // function that notifies when the user has been authenticated
    async onAuthenticatedClient(session){
        console.log('authenticated');
    }
    
    // function that responds when the user sends a message to the bot
    async onMessageClient(msg){
        msg.reply('hello world!');
    }
    
    // notifies you when the client instance is ready
    onReadyClient(){
        console.log('Client is ready!');
    }
    
    // function that generates the qr code and send it to the web
    onQrClient(qr){
        var self = this;
        qrcode.toDataURL(qr, function(err, url){
            self.onNewMessageIO(url);
        })
    }
    
    // issue a new message when the user is newly logged in
    onNewMessageIO(data){
        this.io.sockets.emit("messages", this.qrURL || "");
    }
    
    
   
}

module.exports = SocketClient;
