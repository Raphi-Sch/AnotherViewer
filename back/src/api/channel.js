const db = require('../db.js');

function getAllWatchChannel(req,res) {
    db.query("SELECT id FROM channel where watch=true").then(result => {
        res.send(result);
    }).catch(() => {
        res.send('Server error\n');
    });
}

module.exports = {getAllWatchChannel}
