"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const output_1 = __importDefault(require("./output"));
async function botoutput(input, code, language) {
    let reply = '';
    const res = await output_1.default(input, code, language);
    if (res.data.output !== '') {
        reply += 'Results of your previous code run\n' + `output:${res.data.output}\n`;
    }
    if (res.data.stderror !== '') {
        reply += `standard error: ${res.data.stderror}`;
    }
    if (res.data.error !== '') {
        reply += `Error: ${res.data.error}`;
    }
    return reply;
}
exports.default = botoutput;
