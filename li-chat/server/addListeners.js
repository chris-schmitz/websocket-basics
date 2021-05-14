"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addListeners = void 0;
function addListeners(socket) {
    console.log("new socket connected. adding listeners");
    socket.on("message", function (message) {
        console.log("Got a message: " + message);
        switch (message) {
            case "hi":
                socket.send("hello");
                break;
        }
    });
}
exports.addListeners = addListeners;
//# sourceMappingURL=addListeners.js.map