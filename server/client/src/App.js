import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import ReactModal from 'react-modal';
import './App.css';
import UpperTab from "./components/upperTab/upperTab";
import Button from './components/Button/button';

ReactModal.setAppElement('#root');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
      language: 'javascript',
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
    this.setState({ language })
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

    axios.post('/eval', data)
      .then(res => {
        this.setState({ output: res.data });
      })
      .catch(err => console.log(err));
  }

  // handle modal
  handleCloseModal = (e) => {
    e.preventDefault();
    this.setState({ showModal: false });
    if (this.state.whichModal === 'Add')
      this.setState((prevState, props) => {
        return ({
          collaborators: prevState.collaborators.add(this.state.inputField)
        })
      })
    else
      this.setState((prevState, props) => {
        prevState.collaborators.delete(this.state.inputField);
        return ({
          collaborators: this.state.collaborators
        })
      })
  }

  handleOpenModal = (e) => {
    this.setState({ showModal: true });
    console.log(e.currentTarget.innerHTML);
    if (this.state.inputField)
      this.setState({ whichModal: e.currentTarget.innerHTML })
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
            width="70vw"
            height={(document.documentElement.clientHeight * (3 / 5)) - (2.5 * 16)}
            language={this.state.language}
            theme={this.state.theme}
            value={code}
            options={options}
            onChange={this.saveCode}
            editorDidMount={this.editorDidMount}
          />
        </div>
        <div className="view">
          <div className="info">Your socket id is: 65555423fhjv65</div>
          <div className="msgBlock"></div>
          <div className="field">
            <form className="form">
              <input className="inputField" placeholder="Type your message..."></input>
              <button className="button">Send</button>
            </form>
          </div>
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
              OUTPUT:<br />
              {this.state.output.stderr || this.state.output.error ?
                (this.state.output.stderr + this.state.output.error) : this.state.output.stdout}
            </code>
          </div>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div>
            <form>
              <div>
                HINT: Socket ID can be found on right side of your screen (on top of chat section)
              </div>
              <label htmlFor="socketID">Enter Socker ID of the Collaborator</label>
              <input
                name="socketID"
                type="text"
                placeholder="Enter socket id"
                onChange={e => this.setState({ inputField: e.target.value })}></input>
              <Button click={this.handleCloseModal} name="Submit" />
            </form>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default App;