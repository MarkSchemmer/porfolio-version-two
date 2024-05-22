import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Box } from '@chakra-ui/react';

import { ChakraProvider } from '@chakra-ui/react'

import {
  createBrowserRouter,
  RouterProvider,
  Router,
  Routes,
  Route,
  Outlet,
  BrowserRouter
} from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import { About } from './Pages/About/About';
import { Contact } from './Pages/Contact/Contact';
import { GameApps } from './Pages/GameApps/GameApps';

const Layout = () => {
  return (
    <ChakraProvider>
      <Box>
          <Header />
            <Outlet />
          <Footer />
      </Box>
    </ChakraProvider>
  );
}

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />}></Route>
                  <Route path="about" element={<About />}></Route>
                  <Route path="contact" element={<Contact />}></Route>
                  <Route path="apps" element={<GameApps />}></Route>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
