"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const path = event.path;
    const method = event.httpMethod;
    if (method === 'GET' && path === '/hello') {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Hello, World!' })
        };
    }
    else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: `Bad Request - Path: ${path}, Method: ${method}`
            })
        };
    }
});
exports.handler = handler;
