const config = require('./twitch.json');
const tmi = require('tmi.js');
const db = require('./db.js');
const messageApi = require('./api/message.js');
const socketApi = require('./api/socket.js');

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
    channels : []
};
console.log("Connecting to IRC ...");

let client = new tmi.client(tmiConfig);
client.connect();

client.on('connected', async (adress) => {
    console.log("Connected on : " + adress);
    watchChannels();
});

client.on('disconnected', function(){
    console.log("Disconnected from IRC");
});

client.on('chat', async (channel, user, message, isSelf) => {
    if (isSelf) return;
    let timestamp = new Date();
    await messageApi.insertMessage(timestamp, channel, user, message);
    socketApi.log(timestamp, channel, user['username'], message);
});

async function watchChannels() {
    await db.query("SELECT ID FROM channel WHERE watch=true").then(res => {
        res.forEach(row =>{
            joinChannel(row.ID.substring(1));
        })
    });
}

function joinChannel(channel) {
    client.join(channel);
    console.log("'" + channel + "' added to the watchlist");
}

function leaveChannel(channel) {
    client.part(channel);
    console.log("'" + channel + "' removed from the watchlist");
}

module.exports = { joinChannel, leaveChannel }
