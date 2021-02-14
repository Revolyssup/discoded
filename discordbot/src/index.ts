import discord from 'discord.js';
import handlebot from './handler';
import dotenv from 'dotenv';
dotenv.config();

const bot =new discord.Client();
const token=process.env.TOKEN;
bot.login(token);

bot.on('ready',()=>{
    console.log(`Hy Im ${bot.user?.tag}`)

});

bot.on('message',handlebot);



