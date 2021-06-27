import { useState } from 'react';
import Editor from "@monaco-editor/react"
import Output from './Output';
import LanguageSetter  from './Language';
import Button from '@material-ui/core/Button';
import IOutput from './Output/ouput';
import axios from 'axios';
const defualtOut:IOutput={
  output:"",
  stderror:"",
  error:""
}
function App() {
  const [name,setName]=useState("//Type your code here");
  const [isLoading,setLoading]=useState(false);
  const [language,setLanguage]=useState("cpp")
  const [out,setOutput]=useState(defualtOut)
  const [input,saveInput]=useState("")
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
 async function setInput(e:any){
  saveInput(e.target.value);
  e.target.value=""
 }
  return (
    <div className="App">
      <h1>Welcome to Discoded! A multi language code runner powered by goglot</h1>
      <Button variant="contained" color="primary" onClick={getOutput}>Run</Button>
        <LanguageSetter handler={setLanguage}/>

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
          onChange={handleChange}
          ></Editor>

      
      </div>
    <Output isLoading={isLoading} out={out}/>
    </div>
  );
}

export default App;
