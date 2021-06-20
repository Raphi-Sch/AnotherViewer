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

    setInterval(async function(){
        var result = await commands.timeTrigger();
        if(result){
            send(result);
        }
    }, 60000);
});

client.on('disconnected', function(){
    console.log("[TWITCH] Disconnected from IRC"); 
});

client.on('chat', async (channel, user, message, isSelf) => {
    var result = null;

    // Do not react to himself
    if (isSelf) return;

    console.log(channel);
    console.log(user);
    console.log(message);
    console.log("----------------------------------------------------");

});
