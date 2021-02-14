"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function default_1(input, code, language) {
    if (!input)
        input = "";
    if (!language)
        language = "";
    if (!code)
        code = "";
    return axios_1.default({
        url: 'http://localhost:3000/newcode',
        method: 'POST',
        data: {
            input, code, language
        }
    });
}
exports.default = default_1;
