"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
function generateFilename(code, input) {
    var codeplusinput = {
        code: code,
        input: input
    };
    // Using md5 algorithm
    return crypto_1.default.createHash('md5').update(JSON.stringify(codeplusinput)).digest("hex");
}
exports.default = generateFilename;
