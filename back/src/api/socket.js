const http = require('http');
const port = "3000";
const dateFormat = require('dateformat');


var server = http.createServer();
var io = require('socket.io').listen(server);
var web_client = null;
var web_client_connected = false;

server.listen(port);

io.sockets.on('connection', function (socket) {
    web_client = socket;
    web_client_connected = true;

    socket.on('disconnect', function () {
        web_client_connected = false;
    });
});

function log(timestamp, channel, username, msg){
    if(web_client_connected)
        web_client.emit('log-chat', JSON.stringify({timestamp: dateFormat(timestamp, "HH:MM:ss"), channel: channel, username: username, msg: msg}));
}

module.exports = { log }