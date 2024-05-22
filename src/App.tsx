import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Router from './router/Router';
import { Box } from '@chakra-ui/react';

import { ChakraProvider } from '@chakra-ui/react'





function App() {
  return (
    <ChakraProvider>
        <Box>
            <Header />
            <Footer />
        </Box>
    </ChakraProvider>
  );
}

export default App;
