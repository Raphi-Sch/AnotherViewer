const config = require('./twitch.json');
const tmi = require('tmi.js');
const db = require('./db.js');
const dateFormat = require('dateformat');
const tmiConfig = {
    option: { 
        debug: true 
    },
    connection: { 
        reconnect: true
    },
    identity: {
        username : config["bot_name"],
        password : config["token"]
    },
    channels : [config["channel"]]
};

console.log("[TWITCH] Connecting ...");
client = new tmi.client(tmiConfig);
client.connect();

client.on('connected', async (adress, port) => {
    console.log("[TWITCH] Connected on : " + adress)
});

client.on('disconnected', function(){
    console.log("[TWITCH] Disconnected from IRC"); 
});

client.on('chat', async (channel, user, message, isSelf) => {
    // Do not check himself
    if (isSelf) return;

    console.log("Channel : " + channel + " | User : " + user['username'] + " | Msg : " + message);
    insertMessage(channel, user, message);

});

async function insertMessage(channel, user, message){
    var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    message = addSlashes(message.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));

    await db.query("INSERT INTO `chat` (`id`, `channel_id`, `user_name`, `datetime`, `message`) VALUES (NULL, '" + channel + "', '" + user['username'] + "', '" + datetime + "', '" + message + "');");

    return;
}

function addSlashes(str) {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, '\\\'');
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
}