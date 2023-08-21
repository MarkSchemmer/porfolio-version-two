import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoMVC from './GameApps/TodoMvc/todoMvc';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Router from './router/Router';

function App() {
  return (
    <div className="App">
        <Header />
          <Router /> 
        <Footer />
    </div>
  );
}

export default App;
