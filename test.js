// configuration
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.toDataURL(qr, function(err, url){
        console.log(url);
    })
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();