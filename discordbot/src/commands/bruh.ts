import discord from "discord.js"
import axios from 'axios';
export default async function(args: Array<string>,msg:discord.Message){
    const input:string='';
    const code: string='';
    const language:string='';
    return axios({
        url:'http://load_balancer:3000',
        method:'POST',
        data:{
            input, code, language
        } 
    });
}