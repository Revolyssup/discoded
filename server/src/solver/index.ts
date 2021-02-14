import axios from 'axios';
import {config} from 'dotenv';
config();
const fileExtension = (language:string):string => {
    if (language === 'c')
        return '.c';
    if (language === 'cpp')
        return '.cpp';
    if (language === 'javascript')
        return '.js';
    if (language === 'python')
        return '.py';
    return '.ts';
} 

export default async function solver(name:string,language: string,code: string,input: string){
    const req = { "stdin": input, "files": [{ "name": name+fileExtension(language), "content": code }] };
    
    const url = `https://run.glot.io/languages/${language}/latest`;
    const headers = {
        "Content-type": "application/json",
        "Authorization": `Token ${process.env.GLOT_TOKEN}`
    };
    
    
    return await axios({
        method:'post',
        url:url,
        data:req,
        headers:headers
    })
}