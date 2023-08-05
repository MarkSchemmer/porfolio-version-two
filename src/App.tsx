import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoMVC from './GameApps/TodoMvc/todoMvc';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Right now because we need to do something with our lives. 
        </a>
        <TodoMVC /> 
      </header>
    </div>
  );
}

export default App;
