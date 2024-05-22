import React from 'react';
import TodoMVC from './GameApps/TodoMvc/entities/todoMvc';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Router from './router/Router';
import "../src/App.css";
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box>
        <Header />
          <Router /> 
        <Footer />
    </Box>
  );
}

export default App;
