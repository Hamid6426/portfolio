import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './Theme';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Footer />
    </ThemeProvider>
  );
}

export default App;