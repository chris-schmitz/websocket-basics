"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWebsocketListeners = void 0;
var index_1 = require("./index");
var messageCache = [];
function relayToAllSockets(message) {
    index_1.websocketServer.clients.forEach(function (client) { return client.send(JSON.stringify(message)); });
}
function cacheMessage(messageToClient) {
    messageCache.push(messageToClient);
}
function handleMessage(data, socket) {
    var chattySocket = socket;
    switch (data.action) {
        case "registerName":
            console.log("registering name: " + data.name);
            chattySocket.name = data.name;
            break;
        case "share-user-message":
            var messageToClient = { message: data.message, from: socket.name };
            cacheMessage(messageToClient);
            relayToAllSockets(messageToClient);
            break;
    }
}
function addWebsocketListeners(socket) {
    //abstract
    if (messageCache.length > 0) {
        socket.send(JSON.stringify(messageCache));
    }
    socket.on("message", function (messageEvent) {
        var data = JSON.parse(messageEvent);
        handleMessage(data, socket);
    });
}
exports.addWebsocketListeners = addWebsocketListeners;
//# sourceMappingURL=addWebsocketListeners.js.map