const db = require('../db.js');
const dateFormat = require('dateformat');

function getAllMessages(req, res) {
    let streamer = req.params.streamer
    db.query("SELECT * FROM chat where channel_id = ?", ['#'+streamer]).then(result => {
        res.send(result);
    }).catch(() => {
        res.send('server error')
    });
}

async function insertMessage(timestamp, channel, user, message) {
    console.log("[" + dateFormat(timestamp, "HH:MM:ss") + "] Channel : " + channel + " | User : " + user['username'] + " | Msg : " + message);
    await db.query("INSERT INTO `chat` (`id`, `channel_id`, `user_name`, `datetime`, `message`) VALUES (NULL, ?, ?, ?, ?);", [channel, user['username'], dateFormat(timestamp, "yyyy-mm-dd HH:MM:ss"), message]);
}

module.exports = { getAllMessages, insertMessage };
