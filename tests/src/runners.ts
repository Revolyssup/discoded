import axios from 'axios'



export async function checkJSRunner(){
    const language="js";
    const code="console.log(\"Ashish\")";
    const input="";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', //docker resolves the dns internal ip by service name. //change it to 8080
        method:'POST',
        data:{
            input, code, language, forcerun:true
        } 
    });

    return prom.data;
}


export async function checkpyRunner(){
    const language="py";
    const code="print(\"Ashish\")";
    const input="";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', //docker resolves the dns internal ip by service name. //change it to 8080
        method:'POST',
        data:{
            input, code, language, forcerun:true
        } 
    });

    return prom.data;
}

export async function checkCRunner(){
    const language="c";
    const code="#include<stdio.h>\nint main(){\n  int a; scanf(\"%d\",&a); printf(\"Ashish %d\",a);}";
    const input="5";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', //docker resolves the dns internal ip by service name. //change it to 8080
        method:'POST',
        data:{
            input, code, language, forcerun:true
        } 
    });

    return prom.data;
}

export async function checkgoRunner(){
    const language="go";
    const code="package main \n import \"fmt\" \n func main(){ \n var s string \nfmt.Scanf(\"%s\",&s) \n fmt.Printf(\"%s\",s)   \n }";
    const input="Ashish";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', //docker resolves the dns internal ip by service name. //change it to 8080
        method:'POST',
        data:{
            input, code, language, forcerun:true
        } 
    });

    return prom.data;
}
