/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./public/index.ts ***!
  \*************************/

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waG9uZS1yb3RhdGUvLi9wdWJsaWMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLElBQUssVUFHSjtBQUhELFdBQUssVUFBVTtJQUNYLDJEQUFZO0lBQ1oseURBQVc7QUFDZixDQUFDLEVBSEksVUFBVSxLQUFWLFVBQVUsUUFHZDtBQUVELElBQUssTUFHSjtBQUhELFdBQUssTUFBTTtJQUNQLDJDQUFRO0lBQ1IsK0RBQWtCO0FBQ3RCLENBQUMsRUFISSxNQUFNLEtBQU4sTUFBTSxRQUdWO0FBU0Q7SUFVSSx5QkFBWSxHQUFXO1FBVGYsY0FBUyxHQUFxQixJQUFJO1FBR2xDLE1BQUMsR0FBa0IsQ0FBQztRQUNwQixNQUFDLEdBQWtCLENBQUM7UUFDcEIsTUFBQyxHQUFrQixDQUFDO1FBQzVCLGdCQUFXLEdBQXVCLElBQUk7UUFJbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHO0lBQzNCLENBQUM7SUFFRCwrQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNuQixJQUFJLENBQUMsZUFBZSxFQUFFO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEVBQUU7SUFDMUIsQ0FBQztJQUVPLHlDQUFlLEdBQXZCO1FBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVPLDJDQUFpQixHQUF6QixVQUEwQixLQUE2QjtRQUNuRCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQyxHQUFHLElBQUk7UUFDdkMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFNLENBQUMsR0FBRyxJQUFJO1FBQ3hDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBTSxDQUFDLEdBQUcsSUFBSTtRQUN4QyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFFLEVBQUMsQ0FBQztJQUM3RixDQUFDO0lBRU8sa0NBQVEsR0FBaEI7UUFDSSxJQUFJLENBQUMsV0FBWSxDQUFDLFNBQVMsR0FBRyxRQUFNLElBQUksQ0FBQyxDQUFDLGFBQVEsSUFBSSxDQUFDLENBQUMsYUFBUSxJQUFJLENBQUMsQ0FBRztJQUM1RSxDQUFDO0lBR08seUNBQWUsR0FBdkI7UUFDUSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLLElBQUssY0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBSyxJQUFLLGNBQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQztRQUN2RixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRU8sdUNBQWEsR0FBckIsVUFBc0IsS0FBWTtRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO0lBQ3RDLENBQUM7SUFJTyxzQ0FBWSxHQUFwQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7SUFDOUQsQ0FBQztJQUVPLHVDQUFhLEdBQXJCLFVBQXNCLE9BQXFCO1FBQ3ZDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBR08sc0NBQVksR0FBcEIsVUFBcUIsT0FBc0I7O1FBQ3ZDLFVBQUksQ0FBQyxTQUFTLDBDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTCxzQkFBQztBQUFELENBQUM7QUFFRCxJQUFNLE1BQU0sR0FDTixJQUFJLGVBQWUsQ0FBQyxXQUFTLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBTSxDQUFDO0FBRTFELGFBQWE7QUFDYixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZW51bSBDbGllbnRUeXBlIHtcbiAgICBQSE9ORV9DTElFTlQsXG4gICAgQ1VCRV9DTElFTlRcbn1cblxuZW51bSBBY3Rpb24ge1xuICAgIFJFR0lTVEVSLFxuICAgIFVQREFURV9DT09SRElOQVRFU1xufVxuXG5pbnRlcmZhY2UgQ2xpZW50TWVzc2FnZSB7XG4gICAgYWN0aW9uOiBBY3Rpb24sXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB6OiBudW1iZXJcbn1cblxuY2xhc3MgUm90YXRpb25UcmFja2VyIHtcbiAgICBwcml2YXRlIHdlYnNvY2tldDogV2ViU29ja2V0IHwgbnVsbCA9IG51bGxcbiAgICBwcml2YXRlIHdlYnNvY2tldFVybDogc3RyaW5nXG5cbiAgICBwcml2YXRlIHg6IG51bWJlciB8IG51bGwgPSAwXG4gICAgcHJpdmF0ZSB5OiBudW1iZXIgfCBudWxsID0gMFxuICAgIHByaXZhdGUgejogbnVtYmVyIHwgbnVsbCA9IDBcbiAgICBzdGF0c091dHB1dDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbFxuXG5cbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xuICAgICAgICB0aGlzLndlYnNvY2tldFVybCA9IHVybFxuICAgIH1cblxuICAgIGJlZ2luKCkge1xuICAgICAgICB0aGlzLmdyYWJFbGVtZW50cygpXG4gICAgICAgIHRoaXMuYWRkRG9tTGlzdGVuZXJzKClcbiAgICAgICAgdGhpcy5jb25uZWN0VG9TZXJ2ZXIoKVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRG9tTGlzdGVuZXJzKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZW9yaWVudGF0aW9uXCIsICB0aGlzLnVwZGF0ZU9yaWVudGF0aW9uLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVPcmllbnRhdGlvbihldmVudDogRGV2aWNlT3JpZW50YXRpb25FdmVudCl7XG4gICAgICAgIHRoaXMueCA9IE1hdGguZmxvb3IoZXZlbnQuYmV0YSEpICogMC4wMVxuICAgICAgICB0aGlzLnkgPSBNYXRoLmZsb29yKGV2ZW50LmdhbW1hISkgKiAwLjAxXG4gICAgICAgIHRoaXMueiA9IE1hdGguZmxvb3IoZXZlbnQuYWxwaGEhKSAqIDAuMDFcbiAgICAgICAgdGhpcy51cGRhdGVVaSgpXG4gICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKHthY3Rpb246QWN0aW9uLlVQREFURV9DT09SRElOQVRFUyAseDogdGhpcy54ISwgeTogdGhpcy55ISwgejogdGhpcy56IX0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVVaSgpIHtcbiAgICAgICAgdGhpcy5zdGF0c091dHB1dCEuaW5uZXJUZXh0ID0gYHg6ICR7dGhpcy54fVxcbnk6ICR7dGhpcy55fVxcbno6ICR7dGhpcy56fWBcbiAgICB9XG5cblxuICAgIHByaXZhdGUgY29ubmVjdFRvU2VydmVyKCkge1xuICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMud2Vic29ja2V0VXJsKVxuICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgdGhpcy5vbk9wZW5IYW5kbGVyLmJpbmQodGhpcykpXG4gICAgICAgICAgICB0aGlzLndlYnNvY2tldC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwgKGV2ZW50KSA9PiBjb25zb2xlLmxvZyhcImNvbm5lY3Rpb24gY2xvc2VkXCIpKVxuICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIChldmVudCkgPT4gY29uc29sZS5sb2coXCJjb25uZWN0ZWQgdG8gc2VydmVyXCIpKVxuICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5oYW5kbGVNZXNzYWdlLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk9wZW5IYW5kbGVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbm5lY3RlZCB0byBzZXJ2ZXJcIilcbiAgICB9XG5cblxuXG4gICAgcHJpdmF0ZSBncmFiRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMuc3RhdHNPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXRzLW91dHB1dFwiKVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlRXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBzZW5kVG9TZXJ2ZXIobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkge1xuICAgICAgICB0aGlzLndlYnNvY2tldD8uc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSlcbiAgICB9XG5cbn1cblxuY29uc3QgY2xpZW50XG4gICAgPSBuZXcgUm90YXRpb25UcmFja2VyKGB3c3M6Ly8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fWApXG5cbi8vIEB0cy1pZ25vcmVcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGNsaWVudC5iZWdpbigpKSJdLCJzb3VyY2VSb290IjoiIn0=