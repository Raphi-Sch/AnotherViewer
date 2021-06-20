const express = require('express')
const db = require('../db.js');
const listener = require('../listener.js');
const app = express()

app.get('/message/:streamer', (req,res) => {
    let streamer = req.params.streamer
    db.query("SELECT * FROM chat where channel_id = ?", ['#'+streamer]).then(result => {
        res.send(result);
    }).catch(() => {
        res.send('server error')
    });
})

app.post('/watch/:streamer', (req,res) => {
    let streamer = req.params.streamer
    db.query("INSERT INTO streamer (id, watch) VALUES(?, true) ON DUPLICATE KEY UPDATE watch=true", ['#'+streamer]).then(result => {
        listener.addStreamer(streamer);
        console.log("streamer " + streamer + " is watched by the app");
        res.send("streamer " + streamer + " is watched by the app");
    }).catch(() => {
        res.send('server error')
    });
})

app.delete('/watch/:streamer', (req,res) => {
    let streamer = req.params.streamer
    db.query("INSERT INTO streamer (id, watch) VALUES(?, false) ON DUPLICATE KEY UPDATE watch=false", ['#'+streamer]).then(result => {
        listener.deleteStreamer(streamer);
        console.log("streamer " + streamer + " is not watched by the app again");
        res.send("streamer " + streamer + " is not watched by the app again");
    }).catch(() => {
        res.send('server error')
    });
})

app.listen(8080, () => {
    console.log('Server is listening')
})
