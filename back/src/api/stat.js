const db = require('../db.js');

function getAlphabeticalStat(req, res) {
    const streamer = req.params.streamer;
    db.query("SELECT message FROM chat where channel_id = ? and DATE_FORMAT(datetime, '%d/%m/%Y') = ?", ['#' + streamer, formattedDate()]).then(result => {
        const characters = {};
        result.forEach(mes => {
            var char = mes.message.substring(0, 1).toLowerCase();
            if (characters[char] == null) {
                characters[char] = 1;
            } else {
                characters[char] += 1;
            }
        })
        res.send({
            stat: characters,
            total: result.length
        });
    }).catch(e => {
        res.send('server error');
        console.log(e);
    });
}

function getWordStat(req, res) {
    const streamer = req.params.streamer;
    db.query("SELECT message FROM chat where channel_id = ? and DATE_FORMAT(datetime, '%d/%m/%Y') = ?", ['#' + streamer, formattedDate()]).then(result => {
        const words = {};
        let total = 0;
        result.forEach(mes => {
            mes.message.match(/((?=.)\W*(\w+\s*|$))/g).forEach(word => {
                if (words[word] == null) {
                    words[word] = 1;
                } else {
                    words[word] += 1;
                }
                total++;
            });
        })
        res.send({
            stat: words,
            total: total
        });
    }).catch(e => {
        res.send('server error');
        console.log(e);
    });
}

function formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
}

module.exports = {getAlphabeticalStat, getWordStat};
