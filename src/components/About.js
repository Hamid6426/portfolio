import React from 'react';
import { Container, Typography, Box, Avatar, Grid } from '@mui/material';
import profile from '../assets/Profile.svg'; // Adjust the path if necessary
import { Height } from '@mui/icons-material';

const About = () => {
  return (
    <Container  id="about" maxWidth="md" sx={{ height: 'fit-content'}}>
  <Box
    sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'  }}
  >
    <Grid
      container
      direction="column"  // Changed from row to column
      alignItems="center"
      spacing={4}
      mb={12}
    >
      <Grid item xs={12} md={6} lg={6} mt={10}>
        <Avatar
          alt="My Profile Picture"
          src={profile}
          sx={{ width: '320px', height: '320px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" color="primary" gutterBottom sx={{ textAlign: 'center' }}>
          Hello!  I am Hamid
        </Typography>
        <Typography variant="h5" align="center">
          I am Mian Hamid Ur Rehman, a passionate web developer with experience in front-end and back-end technologies. 
          I specialize in creating responsive and have interest in UX design.
        </Typography>
      </Grid>
    </Grid>
  </Box>
</Container>
  );
};

export default About;

/* NOTES:
1. Create a container of height = '100vh', and maxWidth = md 
2. Container>Grid make a 100vh grid with 2 columns

 <Box sx={{ flexGrow: 1, height: '100vh', border: '2px solid yellow', }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
    >
    </Box>

*/
