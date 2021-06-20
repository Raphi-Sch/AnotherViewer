// Module Import
var config = require('./twitch.json');
const tmi = require("tmi.js");
const db = require("./db.js");

// TMI config
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

// Events
client.on('connected', async (adress, port) => {
    console.log("[TWITCH] Connected on : " + adress)
});

client.on('disconnected', function(){
    console.log("[TWITCH] Disconnected from IRC"); 
});

client.on('chat', async (channel, user, message, isSelf) => {
    // Do not check himself
    if (isSelf) return;

    console.log("Channel : " + channel + " | User : " + user['id'] + " - " + user['username'] + " | Msg : " + message);

});
