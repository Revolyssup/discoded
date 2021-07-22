import axios from 'axios';



export default async function solver(language: string,code: string,input: string){
    const req = { "input": input, "language":language, "code":code };
    
    const url = "http://goglot:5000";
    
    return await axios({
        method:'post',
        url:url,
        data:req,
    })
}