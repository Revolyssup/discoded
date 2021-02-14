"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = __importDefault(require("./commands"));
async function handlebot(msg) {
    var _a;
    //console all messages, except self
    if (msg.author.tag === "NN#5573")
        console.log(`SMOL: ${msg.content}`);
    else if (!(msg.author.tag === "ashish-bot#3739"))
        console.log(`${msg.author.tag}: ${msg.content}`);
    let command;
    let args;
    let prefix = ";";
    //Its for the bot.
    if (msg.content.startsWith(prefix)) {
        msg.content.toLowerCase(); //converting everything to lower case to avoid any ambiguity.
        //extract the arguments
        args = msg.content.split(' ');
        //first element of this array will be prefix and command so we take the command out accordingly.
        command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.slice(prefix.length);
        switch (command) {
            case "bruh":
                commands_1.default.bruh(args, msg);
                break;
            default:
                msg.reply("Oops! I don't recognize this command bro!");
        }
    }
}
exports.default = handlebot;
