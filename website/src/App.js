import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://g4kmiqqxm5.execute-api.us-east-2.amazonaws.com/dev"
          target="_blank"
          rel=""
        >
          Hello world
        </a>
         <a
          className="App-link"
          href="https://g4kmiqqxm5.execute-api.us-east-2.amazonaws.com/dev/table"
          target="_blank"
          rel=""
         >
          Table
        </a>
      </header>
    </div>
  );
}

export default App;