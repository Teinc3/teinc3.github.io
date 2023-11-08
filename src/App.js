import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';

import Navbar from './components/navbar/Navbar';
import Main from './pages/Main';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH={"100vh"} p={0}>
            <Navbar />
            <Main />
            <Footer />
          </Grid>
        </Box>
      </ChakraProvider>
    </Router>
  );
}

export default App;