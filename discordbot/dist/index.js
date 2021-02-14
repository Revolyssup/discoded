"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const handler_1 = __importDefault(require("./handler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bot = new discord_js_1.default.Client();
const token = process.env.TOKEN;
bot.login(token);
bot.on('ready', () => {
    var _a;
    console.log(`Hy Im ${(_a = bot.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
bot.on('message', handler_1.default);
