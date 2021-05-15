import https from "https";
import fs from "fs"
import WebSocket from "ws";
import {join} from "path"
import {requestListener} from "./requestListener";
import {addWebsocketListeners} from "./addWebsocketListeners";

const port = 3003
const httpServer = https.createServer({
    key: fs.readFileSync(join(__dirname, "..", "cert", "key.pem")),
    cert: fs.readFileSync(join(__dirname, "..", "cert", "cert.pem"))
}, requestListener)
const websocketServer = new WebSocket.Server({server: httpServer})

websocketServer.on("connection", addWebsocketListeners)
httpServer.listen(port, () => console.log(`Listening on port: ${port}`))

export {websocketServer}
