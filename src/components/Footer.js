import React from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import { GitHub, LinkedIn, CodePen } from '@mui/icons-material';
import logo from '../assets/H-Hamid-blue-with-white-strip.svg'; // Ensure the logo image is in the correct path

const Footer = () => {
  return (
    <Box  id="contact" component="footer" sx={{ bgcolor: '#000000', py: 2 }}>
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </Box>
        <Box>
          <IconButton href="https://github.com/Hamid6426" target="_blank" sx={{ color: '#ffffff' }}>
            <GitHub />
          </IconButton>
          <IconButton href="https://www.linkedin.com/in/Hamid6426" target="_blank" sx={{ color: '#ffffff' }}>
            <LinkedIn />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
