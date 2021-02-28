import output from "./output";

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
