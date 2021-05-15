"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWebsocketListeners = void 0;
var ClientType;
(function (ClientType) {
    ClientType[ClientType["PHONE_CLIENT"] = 0] = "PHONE_CLIENT";
    ClientType[ClientType["CUBE_CLIENT"] = 1] = "CUBE_CLIENT";
})(ClientType || (ClientType = {}));
var Action;
(function (Action) {
    Action[Action["REGISTER"] = 0] = "REGISTER";
    Action[Action["UPDATE_COORDINATES"] = 1] = "UPDATE_COORDINATES";
})(Action || (Action = {}));
var cubeClients = [];
function relayToCubeClients(message) {
    cubeClients.forEach(function (client) { return client.send(JSON.stringify((message.x = message.x, message.y = message.y, message.z = message.z, message))); });
}
function storeClient(type, client) {
    if (type === ClientType.CUBE_CLIENT) {
        cubeClients.push(client);
    }
}
function handleMessage(data, socket) {
    switch (data.action) {
        case Action.REGISTER:
            storeClient(data.type, socket);
            break;
        case Action.UPDATE_COORDINATES:
            relayToCubeClients(data);
            break;
    }
}
function addWebsocketListeners(socket) {
    socket.on("message", function (messageEvent) {
        var data = JSON.parse(messageEvent);
        handleMessage(data, socket);
    });
}
exports.addWebsocketListeners = addWebsocketListeners;
//# sourceMappingURL=addWebsocketListeners.js.map