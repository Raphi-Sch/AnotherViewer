const db = require('../db.js');
const listener = require('../listener.js');

function joinChannel(req,res) {
    const streamer = req.params.streamer
    db.query("INSERT INTO streamer (id, watch) VALUES(?, true) ON DUPLICATE KEY UPDATE watch=true", ['#'+streamer]).then(() => {
        listener.addStreamer(streamer);
        console.log("streamer " + streamer + " is watched by the app");
        res.send("streamer " + streamer + " is watched by the app");
    }).catch(() => {
        res.send('server error')
    });
}

function leaveChannel(req,res) {
    const streamer = req.params.streamer
    db.query("INSERT INTO streamer (id, watch) VALUES(?, false) ON DUPLICATE KEY UPDATE watch=false", ['#'+streamer]).then(() => {
        listener.deleteStreamer(streamer);
        console.log("streamer " + streamer + " is not watched by the app again");
        res.send("streamer " + streamer + " is not watched by the app again");
    }).catch(() => {
        res.send('server error')
    });
}

module.exports = {joinChannel, leaveChannel};
