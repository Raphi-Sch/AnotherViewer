const http = require('http');
const fs = require('fs');
const url = require('url');
const path = "./";
const port = 8088;

// Basic HTTP server
const server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;

    if(page == "/"){
        fs.readFile(path + 'index.html', 'utf-8', function(error, content) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(content);    
        });
    }
    else{
        page = page.substring(1, page.lenght);
        fs.readFile(path + page, 'utf-8', function(error, content) {
            res.end(content);
        });
    }   
});

console.log("WEB Access : http://localhost:" + port);
server.listen(port);