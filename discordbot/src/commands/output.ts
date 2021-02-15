import axios from 'axios';
export default async function(input:string | undefined,code:string | undefined,language:string | undefined){
    if(!input) input="";
    if(!language) language="";
    if(!code) code="";
    return axios({
        url:'http://load_balancer:8080/api/newcode', //docker resolves the dns internal ip by service name. //change it to 8080
        method:'POST',
        data:{
            input, code, language
        } 
    });
}