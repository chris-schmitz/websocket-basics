"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websocketServer = void 0;
var https_1 = __importDefault(require("https"));
var fs_1 = __importDefault(require("fs"));
var ws_1 = __importDefault(require("ws"));
var path_1 = require("path");
var requestListener_1 = require("./requestListener");
var addWebsocketListeners_1 = require("./addWebsocketListeners");
var port = 3003;
var httpServer = https_1.default.createServer({
    key: fs_1.default.readFileSync(path_1.join(__dirname, "..", "cert", "key.pem")),
    cert: fs_1.default.readFileSync(path_1.join(__dirname, "..", "cert", "cert.pem"))
}, requestListener_1.requestListener);
var websocketServer = new ws_1.default.Server({ server: httpServer });
exports.websocketServer = websocketServer;
websocketServer.on("connection", addWebsocketListeners_1.addWebsocketListeners);
httpServer.listen(port, function () { return console.log("Listening on port: " + port); });
//# sourceMappingURL=index.js.map