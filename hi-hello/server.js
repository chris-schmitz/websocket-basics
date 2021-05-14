const http = require('http')
const fs = require('fs')
const WebSocket = require('ws')

const port = 3001
const httpServer = http.createServer(requestListener)
const websocketServer = new WebSocket.Server({server: httpServer})

websocketServer.on("connection", addListeners)
httpServer.listen(port, () => console.log(`Listening on port: ${port}`))


function addListeners(socket) {
    console.log("new socket connected. adding listeners")
    socket.on("message", message => {
        console.log(`Got a message: ${message}`)
        switch (message) {
            case "hi":
                socket.send("hello")
                break
        }
    })
}

function requestListener(request, response) {
    switch (request.url) {
        case '/':
            const index = fs.createReadStream('./public/index.html');
            response.writeHead(200, {'Content-type': 'text/html'});
            index.pipe(response);
            break
        case '/index.js':
            const indexJs = fs.createReadStream('./public/index.js');
            response.writeHead(200, {'Content-type': 'text/javascript'});
            indexJs.pipe(response);
            break
    }
}