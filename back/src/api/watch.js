const db = require('../db.js');
const listener = require('../listener.js');

function joinChannel(req,res) {
    const streamer = req.params.streamer
    db.query("INSERT INTO channel (id, watch) VALUES(?, true) ON DUPLICATE KEY UPDATE watch=true", ['#'+streamer]).then(() => {
        listener.joinChannel(streamer);
        res.send("Channel " + streamer + " is watched by the app.\n");
    }).catch(() => {
        res.send('Server error\n');
    });
}

function leaveChannel(req,res) {
    const streamer = req.params.streamer
    db.query("INSERT INTO channel (id, watch) VALUES(?, false) ON DUPLICATE KEY UPDATE watch=false", ['#'+streamer]).then(() => {
        listener.leaveChannel(streamer);
        res.send("Channel " + streamer + " is not watched by the app anymore.\n");
    }).catch(() => {
        res.send('Server error\n');
    });
}

module.exports = {joinChannel, leaveChannel};
