"use strict";
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
var RotationTracker = /** @class */ (function () {
    function RotationTracker(url) {
        this.websocket = null;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.statsOutput = null;
        this.websocketUrl = url;
    }
    RotationTracker.prototype.begin = function () {
        this.grabElements();
        this.addDomListeners();
        this.connectToServer();
    };
    RotationTracker.prototype.addDomListeners = function () {
        window.addEventListener("deviceorientation", this.updateOrientation.bind(this));
    };
    RotationTracker.prototype.updateOrientation = function (event) {
        this.x = Math.floor(event.beta) * 0.01;
        this.y = Math.floor(event.gamma) * 0.01;
        this.z = Math.floor(event.alpha) * 0.01;
        this.updateUi();
        this.sendToServer({ action: Action.UPDATE_COORDINATES, x: this.x, y: this.y, z: this.z });
    };
    RotationTracker.prototype.updateUi = function () {
        this.statsOutput.innerText = "x: " + this.x + "\ny: " + this.y + "\nz: " + this.z;
    };
    RotationTracker.prototype.connectToServer = function () {
        this.websocket = new WebSocket(this.websocketUrl);
        this.websocket.addEventListener("open", this.onOpenHandler.bind(this));
        this.websocket.addEventListener("close", function (event) { return console.log("connection closed"); });
        this.websocket.addEventListener("error", function (event) { return console.log("connected to server"); });
        this.websocket.addEventListener("message", this.handleMessage.bind(this));
    };
    RotationTracker.prototype.onOpenHandler = function (event) {
        console.log("connected to server");
    };
    RotationTracker.prototype.grabElements = function () {
        this.statsOutput = document.querySelector("#stats-output");
    };
    RotationTracker.prototype.handleMessage = function (message) {
        var data = JSON.parse(message.data);
    };
    RotationTracker.prototype.sendToServer = function (message) {
        var _a;
        (_a = this.websocket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(message));
    };
    return RotationTracker;
}());
var client = new RotationTracker("wss://" + window.location.host);
// @ts-ignore
document.addEventListener("DOMContentLoaded", client.begin());
//# sourceMappingURL=index.js.map