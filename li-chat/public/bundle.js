/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./public/index.ts ***!
  \*************************/

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saS1jaGF0Ly4vcHVibGljL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQTtJQVVJLHlCQUFZLEdBQVc7UUFUdkIsY0FBUyxHQUFxQixJQUFJO1FBR2xDLGNBQVMsR0FBNEIsSUFBSTtRQUN6QyxrQkFBYSxHQUE2QixJQUFJO1FBQzlDLFlBQU8sR0FBdUIsSUFBSTtRQUNsQyxjQUFTLEdBQTRCLElBQUk7UUFDekMsZUFBVSxHQUE2QixJQUFJO1FBR3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRztJQUMzQixDQUFDO0lBRUQsK0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRTtJQUMxQixDQUFDO0lBRUQseUNBQWUsR0FBZjs7UUFDSSxVQUFJLENBQUMsYUFBYSwwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUUsVUFBSSxDQUFDLFVBQVUsMENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLFVBQUksQ0FBQyxTQUFTLDBDQUFFLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCwrQ0FBcUIsR0FBckIsVUFBc0IsS0FBb0I7UUFDdEMsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELHNDQUFZLEdBQVo7O1FBQ0ksVUFBSSxDQUFDLFNBQVMsMENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxV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QVMsMENBQUUsS0FBSztJQUNoQyxDQUFDO0lBRU8sc0NBQVksR0FBcEIsVUFBcUIsSUFBWTtRQUM3QixPQUFPLElBQUksQ0FBQyxTQUFVLENBQUMsS0FBSyxHQUFHLElBQUk7SUFDdkMsQ0FBQztJQUVPLHNDQUFZLEdBQXBCLFVBQXFCLE9BQXNCOztRQUN2QyxVQUFJLENBQUMsU0FBUywwQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sa0NBQVEsR0FBaEIsVUFBaUIsSUFBdUM7UUFDcEQsSUFBSSxDQUFDLE9BQVEsQ0FBQyxTQUFTLElBQU8sSUFBSSxDQUFDLElBQUksVUFBSyxJQUFJLENBQUMsT0FBTyxPQUFJO0lBQ2hFLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUM7QUFFRCxJQUFNLE1BQU0sR0FDTixJQUFJLGVBQWUsQ0FBQyxVQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBTSxDQUFDO0FBRXpELGFBQWE7QUFDYixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBDbGllbnRNZXNzYWdlIHtcbiAgICBhY3Rpb246IHN0cmluZyxcbiAgICBuYW1lPzogc3RyaW5nLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmdcbn1cblxuY2xhc3MgV2Vic29ja2V0Q2xpZW50IHtcbiAgICB3ZWJzb2NrZXQ6IFdlYlNvY2tldCB8IG51bGwgPSBudWxsXG4gICAgcHJpdmF0ZSB3ZWJzb2NrZXRVcmw6IHN0cmluZ1xuXG4gICAgbmFtZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGxcbiAgICBjb25uZWN0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsXG4gICAgY2hhdExvZzogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbFxuICAgIHVzZXJJbnB1dDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsXG4gICAgc2VuZEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsID0gbnVsbFxuXG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy53ZWJzb2NrZXRVcmwgPSB1cmxcbiAgICB9XG5cbiAgICBiZWdpbigpIHtcbiAgICAgICAgdGhpcy5ncmFiRWxlbWVudHMoKVxuICAgICAgICB0aGlzLmFkZERvbUxpc3RlbmVycygpXG4gICAgfVxuXG4gICAgYWRkRG9tTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmNvbm5lY3RCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNvbm5lY3RUb1NlcnZlci5iaW5kKHRoaXMpKVxuICAgICAgICB0aGlzLnNlbmRCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNlbmRNZXNzYWdlLmJpbmQodGhpcykpXG4gICAgICAgIHRoaXMudXNlcklucHV0Py5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmVudGVyQnV0dG9uU3VibWlzc2lvbi5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGVudGVyQnV0dG9uU3VibWlzc2lvbihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck5hbWUoKSB7XG4gICAgICAgIHRoaXMud2Vic29ja2V0Py5zZW5kKEpTT04uc3RyaW5naWZ5KHthY3Rpb246IFwicmVnaXN0ZXJOYW1lXCIsIG5hbWU6IHRoaXMubmFtZUlucHV0Py52YWx1ZX0pKVxuICAgIH1cblxuXG4gICAgY29ubmVjdFRvU2VydmVyKCkge1xuICAgICAgICBpZiAodGhpcy5uYW1lSW5wdXQ/LnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLndlYnNvY2tldCA9IG5ldyBXZWJTb2NrZXQodGhpcy53ZWJzb2NrZXRVcmwpXG4gICAgICAgICAgICB0aGlzLndlYnNvY2tldC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCB0aGlzLm9uT3BlbkhhbmRsZXIuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIHRoaXMud2Vic29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCAoZXZlbnQpID0+IGNvbnNvbGUubG9nKFwiY29ubmVjdGlvbiBjbG9zZWRcIikpXG4gICAgICAgICAgICB0aGlzLndlYnNvY2tldC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKGV2ZW50KSA9PiBjb25zb2xlLmxvZyhcImNvbm5lY3RlZCB0byBzZXJ2ZXJcIikpXG4gICAgICAgICAgICB0aGlzLndlYnNvY2tldC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLmhhbmRsZU1lc3NhZ2UuYmluZCh0aGlzKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KFwieW91IG5lZWQgdG8gYWRkIGEgbmFtZSBiZWZvcmUgeW91IGNhbiBjb25uZWN0LlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PcGVuSGFuZGxlcihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25uZWN0ZWQgdG8gc2VydmVyXCIpXG4gICAgICAgIHRoaXMuZGlzYWJsZUNvbm5lY3RCdXR0b24oKVxuICAgICAgICB0aGlzLmVuYWJsZUlucHV0RWxlbWVudHMoKVxuICAgICAgICB0aGlzLnJlZ2lzdGVyTmFtZSgpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNhYmxlQ29ubmVjdEJ1dHRvbigpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0QnV0dG9uIS5kaXNhYmxlZCA9IHRydWVcbiAgICB9XG5cbiAgICBwcml2YXRlIGVuYWJsZUlucHV0RWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMudXNlcklucHV0IS5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuc2VuZEJ1dHRvbiEuZGlzYWJsZWQgPSBmYWxzZVxuICAgIH1cblxuICAgIHByaXZhdGUgZ3JhYkVsZW1lbnRzKCkge1xuICAgICAgICB0aGlzLm5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1uYW1lXCIpXG4gICAgICAgIHRoaXMuY29ubmVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29ubmVjdC1idXR0b25cIilcbiAgICAgICAgdGhpcy5jaGF0TG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGF0LWxvZ1wiKVxuICAgICAgICB0aGlzLnVzZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlci1pbnB1dFwiKVxuICAgICAgICB0aGlzLnNlbmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmQtYnV0dG9uXCIpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VFdmVudCkge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChtZXNzYWdlID0+IHRoaXMuYWRkVG9Mb2cobWVzc2FnZSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvTG9nKGRhdGEpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbmRNZXNzYWdlKCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5nZXRVc2VySW5wdXQoKVxuICAgICAgICBpZiAoIW1lc3NhZ2UpIHJldHVyblxuXG4gICAgICAgIHRoaXMuc2V0VXNlcklucHV0KFwiXCIpXG4gICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKHttZXNzYWdlLCBhY3Rpb246IFwic2hhcmUtdXNlci1tZXNzYWdlXCJ9KVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VXNlcklucHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VySW5wdXQ/LnZhbHVlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRVc2VySW5wdXQoZGF0YTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJJbnB1dCEudmFsdWUgPSBkYXRhXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZW5kVG9TZXJ2ZXIobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkge1xuICAgICAgICB0aGlzLndlYnNvY2tldD8uc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvTG9nKGRhdGE6IHsgbWVzc2FnZTogc3RyaW5nLCBmcm9tOiBzdHJpbmcgfSkge1xuICAgICAgICB0aGlzLmNoYXRMb2chLmlubmVyVGV4dCArPSBgJHtkYXRhLmZyb219OiAke2RhdGEubWVzc2FnZX1cXG5gXG4gICAgfVxufVxuXG5jb25zdCBjbGllbnRcbiAgICA9IG5ldyBXZWJzb2NrZXRDbGllbnQoYHdzOi8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH1gKVxuXG4vLyBAdHMtaWdub3JlXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBjbGllbnQuYmVnaW4oKSkiXSwic291cmNlUm9vdCI6IiJ9