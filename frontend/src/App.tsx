import { useState } from 'react';
import Editor from "@monaco-editor/react"
import Output from './Output';
import LanguageSetter  from './Language';
import Button from '@material-ui/core/Button';
import IOutput from './Output/ouput';
import axios from 'axios';
import {jsCode,goCode,monkeyCode,cCode,cppCode,pyCode} from './defaultCode'
const defualtOut:IOutput={
  output:"",
  stderror:"",
  error:""
}
function App() {
  const [name,setName]=useState(cppCode);
  const [isLoading,setLoading]=useState(false);
  const [language,setLanguage]=useState("cpp");
  const [out,setOutput]=useState(defualtOut);
  const [input,saveInput]=useState("");
  function handleChange(val:any,event:any){
    setName(val)
  }
 async function getOutput(){
   const data={
     language:language,
     code:name,
     input:input
   }
   console.log(JSON.stringify(data))
   setLoading(true)
  axios.post("/api/newcode",data).then(res=>{
    setLoading(false)
    setOutput(res.data)
  }).catch(err=>console.log(err));

 }

 function changeLan(lan:string){

   switch(lan){
     case "cpp":
        setName(cppCode);
        break;
     case "c":
        setName(cCode);
        break;
     case "javascript":
        setName(jsCode);
        break;
      case "python":
        setName(pyCode);
        break;
      case "golang":
        setName(goCode);
        break;
      case "monkey":
        setName(monkeyCode);
        break;
      default:
        setName("//Enter Code here!")
        break
   }
   setLanguage(lan);
 }
 async function setInput(e:any){
  saveInput(e.target.value);
  e.target.value=""
 }

  return (
    <div className="App">
      <h1>Welcome to Discoded! A multi language code runner powered by goglot</h1>
      <Button variant="contained" color="primary" onClick={getOutput}>Run</Button>
        <LanguageSetter handler={changeLan}/>

        <div className='input'>
          <textarea
            className='textBox'
            value={input}
            onChange={setInput}
            placeholder="Input goes here..." />
        </div>
      <div>
     
          <Editor
          height="50vh"
          defaultLanguage="cpp"
          language={language}
          defaultValue={name}
          value={name}
          onChange={handleChange}
          ></Editor>

      
      </div>
    <Output isLoading={isLoading} out={out}/>
    </div>
  );
}

export default App;
