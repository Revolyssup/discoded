import AxiosWithRetries from "./retry"

const axios = AxiosWithRetries(10, 10000);
export async function checkCRunner(){
    const language="c";
    const code="#include<stdio.h>\nint main(){\n  int a; scanf(\"%d\",&a); printf(\"Ashish %d\",a);}";
    const input="5";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', 
        method:'POST',
        data:{
            input, code, language
        } 
    });

    return prom.data;
}

export async function checkJSRunner(){
    const language="js";
    const code="console.log(\"Ashish\")";
    const input="";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', 
        method:'POST',
        data:{
            input, code, language
        } 
    });

    return prom.data;
}


export async function checkpyRunner(){
    const language="py";
    const code="print(\"Ashish\")";
    const input="";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', 
        method:'POST',
        data:{
            input, code, language
        } 
    });

    return prom.data;
}


export async function checkgoRunner(){
    const language="go";
    const code="package main \n import \"fmt\" \n func main(){ \n var s string \nfmt.Scanf(\"%s\",&s) \n fmt.Printf(\"%s\",s)   \n }";
    const input="Ashish";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', 
        method:'POST',
        data:{
            input, code, language
        } 
    });

    return prom.data;
}

export async function checkCppRunner(){
    const language="cpp";
    const code="#include<iostream>\nint main(){\n  int a; std::cin>>a; std::cout<<a*2;}";
    const input="5";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', 
        method:'POST',
        data:{
            input, code, language
        } 
    });

    return prom.data;
}


export async function checkCaching1(){
    const language="py";
    const code="print(\"Ashish\")";
    const input="";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', 
        method:'POST',
        data:{
            input, code, language
        } 
    });

    return prom.data;
}

export async function checkCaching2(){
    const language="cpp";
    const code="#include<iostream>\nint main(){\n  int a; std::cin>>a; std::cout<<a*2;}";
    const input="5";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', 
        method:'POST',
        data:{
            input, code, language
        } 
    });

    return prom.data;
}


export async function checkTimeout(){
    const language="cpp";
    const code="#include<iostream>\nint main(){\n while(1){}}";
    const input="5";
    const prom= await axios({
        url:'http://localhost:3000/api/newcode', 
        method:'POST',
        data:{
            input, code, language
        } 
    });

    return prom.data;
}