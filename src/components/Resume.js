import React from 'react';
import { Box, Container, Button, Typography, } from '@mui/material';
import resumeImage from '../assets/Hamid_Resume.png'; // Ensure the image is in the correct path

const Resume = () => {
  return (
    <Box  id="resume" component="section" sx={{ bgcolor: '#000011', color: '#ffffff', py: 6 }}>
      <Container maxWidth="md">
      <Typography variant="h2" color="primary" gutterBottom align="center" sx={{ mb: 4,}}>Resume</Typography>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <img src={resumeImage} alt="Resume" style={{ width: '100%', maxWidth: '100%', height: 'auto' }} />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            href="https://github.com/Hamid6426/portfolio/blob/main/Hamid%20Resume.png?raw=true"
            download="Hamid_Resume.pdf"
            sx={{ fontSize:'28px'}}
          >
            Download Resume
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Resume;
