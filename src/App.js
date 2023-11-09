import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Spacer,
  theme,
} from '@chakra-ui/react';

import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl" display="flex" flexDirection="column" minHeight="100vh">
          <Navbar />
          <Spacer />
          <Box flex="1">
            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route path="/about" element={<About />}/>
            </Routes>
          </Box>
          <Footer />
        </Box>
      </ChakraProvider>
    </Router>
  );
}

export default App;