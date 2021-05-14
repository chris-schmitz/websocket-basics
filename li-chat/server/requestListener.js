"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestListener = void 0;
var fs_1 = __importDefault(require("fs"));
function requestListener(request, response) {
    switch (request.url) {
        case '/':
            var index = fs_1.default.createReadStream('./public/index.html');
            response.writeHead(200, { 'Content-type': 'text/html' });
            index.pipe(response);
            break;
        case '/bundle.js':
            var indexJs = fs_1.default.createReadStream('./public/bundle.js');
            response.writeHead(200, { 'Content-type': 'text/javascript' });
            indexJs.pipe(response);
            break;
    }
}
exports.requestListener = requestListener;
//# sourceMappingURL=requestListener.js.map