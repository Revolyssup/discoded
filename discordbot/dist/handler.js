"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = __importDefault(require("./commands"));
const helper = `
;code <language name> <standard input> <code>   --- to run code. Keep the code in a string.
;help --- to get list of available commands.
`;
async function handlebot(msg) {
    let prefix = ";";
    //Its for the bot.
    if (msg.content.startsWith(prefix) || !msg.author.bot) {
        let args = msg.content.slice(prefix.length).trim().split(' ');
        const command = args.shift();
        const language = args.shift();
        const input = args.shift();
        let code = "";
        console.log(command);
        switch (command) {
            case "code":
                code = args.join(' ');
                const reply = await commands_1.default(input, code, language);
                msg.reply(reply);
                break;
            case "help":
                msg.reply(helper);
            default:
                msg.reply("Oops! I don't recognize this command! Type ;help for more.");
        }
    }
}
exports.default = handlebot;
