import http from "http";
import WebSocket from "ws";
import {requestListener} from "./requestListener";
import {addWebsocketListeners} from "./addWebsocketListeners";

const port = 3002
const httpServer = http.createServer(requestListener)
const websocketServer = new WebSocket.Server({server: httpServer})

websocketServer.on("connection", addWebsocketListeners)
httpServer.listen(port, () => console.log(`Listening on port: ${port}`))

export {websocketServer}
