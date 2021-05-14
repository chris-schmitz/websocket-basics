"use strict";
var WebsocketClient = /** @class */ (function () {
    function WebsocketClient(url) {
        this.websocket = null;
        this.nameInput = null;
        this.connectButton = null;
        this.chatLog = null;
        this.userInput = null;
        this.sendButton = null;
        this.websocketUrl = url;
    }
    WebsocketClient.prototype.begin = function () {
        this.grabElements();
        this.addDomListeners();
    };
    WebsocketClient.prototype.addDomListeners = function () {
        var _a, _b, _c;
        (_a = this.connectButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.connectToServer.bind(this));
        (_b = this.sendButton) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.sendMessage.bind(this));
        (_c = this.userInput) === null || _c === void 0 ? void 0 : _c.addEventListener("keydown", this.enterButtonSubmission.bind(this));
    };
    WebsocketClient.prototype.enterButtonSubmission = function (event) {
        if (event.key == "Enter") {
            this.sendMessage();
        }
    };
    WebsocketClient.prototype.registerName = function () {
        var _a, _b;
        (_a = this.websocket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ action: "registerName", name: (_b = this.nameInput) === null || _b === void 0 ? void 0 : _b.value }));
    };
    WebsocketClient.prototype.connectToServer = function () {
        var _a;
        if ((_a = this.nameInput) === null || _a === void 0 ? void 0 : _a.value) {
            this.websocket = new WebSocket(this.websocketUrl);
            this.websocket.addEventListener("open", this.onOpenHandler.bind(this));
            this.websocket.addEventListener("close", function (event) { return console.log("connection closed"); });
            this.websocket.addEventListener("error", function (event) { return console.log("connected to server"); });
            this.websocket.addEventListener("message", this.handleMessage.bind(this));
        }
        else {
            alert("you need to add a name before you can connect.");
        }
    };
    WebsocketClient.prototype.onOpenHandler = function (event) {
        console.log("connected to server");
        this.disableConnectButton();
        this.enableInputElements();
        this.registerName();
    };
    WebsocketClient.prototype.disableConnectButton = function () {
        this.connectButton.disabled = true;
    };
    WebsocketClient.prototype.enableInputElements = function () {
        this.userInput.disabled = false;
        this.sendButton.disabled = false;
    };
    WebsocketClient.prototype.grabElements = function () {
        this.nameInput = document.querySelector("#user-name");
        this.connectButton = document.querySelector("#connect-button");
        this.chatLog = document.querySelector("#chat-log");
        this.userInput = document.querySelector("#user-input");
        this.sendButton = document.querySelector("#send-button");
    };
    WebsocketClient.prototype.handleMessage = function (message) {
        var _this = this;
        var data = JSON.parse(message.data);
        if (data instanceof Array) {
            data.forEach(function (message) { return _this.addToLog(message); });
        }
        else {
            this.addToLog(data);
        }
    };
    WebsocketClient.prototype.sendMessage = function () {
        var message = this.getUserInput();
        if (!message)
            return;
        this.setUserInput("");
        this.sendToServer({ message: message, action: "share-user-message" });
    };
    WebsocketClient.prototype.getUserInput = function () {
        var _a;
        return (_a = this.userInput) === null || _a === void 0 ? void 0 : _a.value;
    };
    WebsocketClient.prototype.setUserInput = function (data) {
        return this.userInput.value = data;
    };
    WebsocketClient.prototype.sendToServer = function (message) {
        var _a;
        (_a = this.websocket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(message));
    };
    WebsocketClient.prototype.addToLog = function (data) {
        this.chatLog.innerText += data.from + ": " + data.message + "\n";
    };
    return WebsocketClient;
}());
var client = new WebsocketClient("ws://" + window.location.host);
// @ts-ignore
document.addEventListener("DOMContentLoaded", client.begin());
//# sourceMappingURL=index.js.map