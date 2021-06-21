const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

const watch = require('./watch.js');
const message = require('./message.js');
const stat = require('./stat.js');
const channel = require('./channel.js');

app.get('/channel/watch', channel.getAllWatchChannel);

app.get('/message/:streamer', message.getAllMessages);

app.get('/stat/:streamer/alphabet', stat.getAlphabeticalStat);
app.get('/stat/:streamer/word', stat.getWordStat);

app.post('/watch/:streamer',   watch.joinChannel);
app.put('/watch/:streamer',    watch.joinChannel);
app.delete('/watch/:streamer', watch.leaveChannel);

app.listen(8080, () => {
    console.log('Server is listening')
})
