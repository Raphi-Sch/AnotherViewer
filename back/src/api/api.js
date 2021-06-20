const express = require('express');
const app = express();

const watch = require('./watch.js');
const message = require('./message.js');

app.get('/message/:streamer', message.getAllMessages);

app.post('/watch/:streamer',   watch.joinChannel);
app.put('/watch/:streamer',    watch.joinChannel);
app.delete('/watch/:streamer', watch.leaveChannel);

app.listen(8080, () => {
    console.log('Server is listening')
})
