import React from 'react';
import './App.css';
import TodoMVC from './GameApps/TodoMvc/entities/todoMvc';
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