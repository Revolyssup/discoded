import output from "./output";
import axios from 'axios'
export default async function botoutput(input:string | undefined,code:string | undefined,language:string|undefined){
    let reply='';
    const res=await output(input,code,language);

    if(res.data.output!==''){
        reply+='Results of your previous code run\n'+`output:${res.data.output}\n`;
    }
    if(res.data.stderror!==''){
        reply+=`standard error: ${res.data.stderror}`
    }

    if(res.data.error!==''){
        reply+=`Error: ${res.data.err}`
    }
    return reply;
} 


export async function getLyrics(name:string | undefined):Promise<string>{
    if(!name) return "Invalid song name";
    const res=await axios({
        url:'http://load_balancer:8080/api/lyrics', //docker resolves the dns internal ip by service name. //change it to 8080
        method:'POST',
        data:{
            name
        } 
    })
    if(!res.data.lyrics) return "Did not find";
    else return res.data.lyrics

}