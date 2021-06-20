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
    channels : []
};
console.log("[TWITCH] Connecting ...");

let client = new tmi.client(tmiConfig);
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
    await insertMessage(channel, user, message);
});
getChannels();

async function insertMessage(channel, user, message){
    let datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    await db.query("INSERT INTO `chat` (`id`, `channel_id`, `user_name`, `datetime`, `message`) VALUES (NULL, ?, ?, ?, ?);", [channel, user['username'], datetime, message]);
}

async function getChannels() {
    await db.query("SELECT ID FROM streamer WHERE watch=true").then(res => {
        res.forEach(row =>{
            tmiConfig.channels.push(row.ID.substring(1));
        })
    });
}

function addStreamer(streamer) {
    client.join(streamer);
}
function deleteStreamer(streamer) {
    client.part(streamer);
}
module.exports = { addStreamer, deleteStreamer }
