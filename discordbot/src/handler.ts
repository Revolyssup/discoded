import discord from 'discord.js';
import Commands from './commands';


export default async function handlebot(msg: discord.Message){
    //console all messages, except self
    if(msg.author.tag==="NN#5573") console.log(`SMOL: ${msg.content}`)
    else if(!(msg.author.tag==="ashish-bot#3739")) console.log(`${msg.author.tag}: ${msg.content}`)
    let command :string | undefined;
    let args:Array<string>;
    let prefix:string=";";

    //Its for the bot.
    if(msg.content.startsWith(prefix)){

        msg.content.toLowerCase(); //converting everything to lower case to avoid any ambiguity.

        //extract the arguments
        args=msg.content.split(' ');
        //first element of this array will be prefix and command so we take the command out accordingly.
        command=args.shift()?.slice(prefix.length);
        switch(command){
            case "bruh":
                Commands.bruh(args,msg);
                break;
            default:
                msg.reply("Oops! I don't recognize this command bro!")
        }
    }
    
}