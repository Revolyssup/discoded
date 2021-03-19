import discord from 'discord.js';
import botoutput,{getLyrics} from './commands';

const helper=`
;code 
<language name> 
<standard input> 
<code>   

;song 
<song name> to get lyrics of a song
--- to run code.NOTE:- Make sure the standard input doesn't have any newline characters
;help --- to get list of available commands.
`

export default async function handlebot(msg: discord.Message){
    let prefix:string=";";

    //Its for the bot.
    if(msg.content.startsWith(prefix) && !msg.author.bot){

        
        let args:string[] = msg.content.slice(prefix.length).trim().split('\n');
        
        const command = args.shift();
        const language=args.shift();
        const input=args.shift();
        
        let code:string="";
        console.log(command);
        switch(command){
            case "code":
                code=args.join('\n');
                const reply=await botoutput(input,code,language);
                msg.reply(reply);
                break;
            case "song":
                let songName=language;
                const lyrics=await getLyrics(songName);
                if(lyrics.length<1500) msg.reply(lyrics);
                else{ //discord limits the reply to be not more than 2000 characters
                    let i=0;
                    let j=1500;
                    while(j<=lyrics.length){
                        console.log("i and j "+i+" "+j);
                        console.log(lyrics.slice(i,j));
                        msg.reply(lyrics.slice(i,j));
                        i=j;
                        j=j+1500;
                    }
                }
                
                break;
            case "help":
                msg.reply(helper);
                break;
            default:
                msg.reply("Oops! I don't recognize this command! Type ;help for more.")
        }
    }
    
}