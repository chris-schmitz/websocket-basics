"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websocketServer = void 0;
var http_1 = __importDefault(require("http"));
var ws_1 = __importDefault(require("ws"));
var requestListener_1 = require("./requestListener");
var addWebsocketListeners_1 = require("./addWebsocketListeners");
var port = 3002;
var httpServer = http_1.default.createServer(requestListener_1.requestListener);
var websocketServer = new ws_1.default.Server({ server: httpServer });
exports.websocketServer = websocketServer;
websocketServer.on("connection", addWebsocketListeners_1.addWebsocketListeners);
httpServer.listen(port, function () { return console.log("Listening on port: " + port); });
//# sourceMappingURL=index.js.map