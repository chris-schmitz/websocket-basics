import http from "http";
import fs from "fs";

export function requestListener(request: http.IncomingMessage, response: http.ServerResponse) {
    switch (request.url) {
        case '/':
            const index = fs.createReadStream('./public/index.html');
            response.writeHead(200, {'Content-type': 'text/html'});
            index.pipe(response);
            break
        case '/bundle.js':
            const indexJs = fs.createReadStream('./public/bundle.js');
            response.writeHead(200, {'Content-type': 'text/javascript'});
            indexJs.pipe(response);
            break
    }
}