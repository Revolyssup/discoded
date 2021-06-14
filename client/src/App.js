import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import ReactModal from 'react-modal';
import './App.css';
import UpperTab from "./components/upperTab/upperTab";
// import Button from './components/Button/button';

ReactModal.setAppElement('#root');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 'print("You are using goglot code runner!") ',
      language: 'monkey',
      theme: 'vs-dark',
      output: '',
      input: '',
      collaborators: new Set([]),
      showModal: false,
      whichModal: '',
      inputField: ''
    }
  }

  editorDidMount(editor, monaco) {
    editor.focus();
  }

  //takes a default language and set up some boilerplate
  defaultCode = (language) => {
    let code = ' '
    switch (language){
      case 'cpp':{
        code=`#include<iostream>

int main(){
  std::cout<<"You are running goglot code runner";
}
`
        break;
      }
      case 'c':{
        code=`#include<stdio.h>

        int main(){
          printf("You are using goglot code runner");
        }
        `
        break;
      }
      case 'go':{
        code=`package main
        import "fmt"

        func main(){
          fmt.Printf("You are using goglot code runner")
        }
        `
        break;
      }

      case 'python':{
        code=`print("You are using goglot code runner")`
        break;
      }

      case 'javascript':{
        code=`console.log("You are using goglot code runner")`
        break;
      }
      case 'monkey':{
        code=`print("You are using goglot code runner")`
        break;
      }
      default:{code=`//Welcome to goglot.`}
      
    }

    return code;
  }
  // Make the language compliant to the backend needs
  getLanguage = (event) => {
    let language;
    if (event.target.value === 'C++')
      language = 'cpp';
    else if (event.target.value === 'C')
      language = 'c';
    else if (event.target.value === 'JavaScript')
      language = 'javascript';
    else if (event.target.value === 'Python3')
      language = 'python';
    else if (event.target.value === 'Go')
      language = 'go';
    else if (event.target.value === 'Go')
      language='monkey'
    this.setState({ language, code:this.defaultCode(language)})
  }

  // Set the theme of the editor using this function
  getTheme = (event) => {
    if (event.target.value === 'Light')
      this.setState({ theme: 'vs' })
    else
      this.setState({ theme: 'vs-dark' });
  }

  // Save code into the state
  saveCode = (newValue) => {
    console.log(newValue)
    this.setState({ code: newValue });
  }

  // Save input parameters into the state
  saveInput = (event) => {
    this.setState({ input: event.target.value })
    event.target.value = '';
  }

  // Handle click event@ BUILD button
  click = () => {
    const data = {
      language: this.state.language,
      code: this.state.code,
      input: this.state.input
    }

    console.log(JSON.stringify(data))

    axios.post('/api/newcode', data)
      .then(res => {
        this.setState({ output: res.data });
      })
      .catch(err => console.log(err));
  }

 
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div className="App">
        <div className="editor">
          <UpperTab getLanguage={this.getLanguage}
            getTheme={this.getTheme}
            click={this.click}
            modal={this.handleOpenModal} />
          <MonacoEditor
            width="100vw"
            // height={(document.documentElement.clientHeight * (3 / 5)) - (2.5 * 16)}
            language={this.state.language}
            theme={this.state.theme}
            value={code}
            options={options}
            onChange={this.saveCode}
            editorDidMount={this.editorDidMount}
          />
        </div>
        <div className='input'>
          <textarea
            className='textBox'
            value={this.state.input}
            onChange={this.saveInput}
            placeholder="Input goes here..." />
        </div>
        <div className='output'>
          <div className='outputArea'>
            <code>
              output: {this.state.output.output}<br></br>
              error: {this.state.output.error}<br></br>
              stderr: {this.state.output.stderror}<br></br>
            </code>
          </div>
        </div>

      </div>
    );
  }
}

export default App;