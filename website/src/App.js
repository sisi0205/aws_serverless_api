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
          href="https://e6tsicu0ga.execute-api.us-east-2.amazonaws.com/Stage"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello world
        </a>
        <p> this is update </p>
      </header>
    </div>
  );
}

export default App;
