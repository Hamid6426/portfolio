import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  CardMedia
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import landingPage from '../assets/landing-page.png'
import regForm from '../assets/Reg-form.png'
import calculator from '../assets/calculator.png'
import drum from '../assets/Drum.png'
import dataCollection from '../assets/department-data-collection.png'



const projectsData = [
  {
    image: landingPage,
    title: 'Accredian Landing Page',
    description: 'Developed with React and MUI. A landing page with a form to refer a friend accredian learning',
    technologies: ['React', 'Material-UI', 'JavaScript'],
    link: 'https://refer-and-earn-frontend.vercel.app/'
  },
  {
    image: regForm,
    title: 'Department Data Collection',
    description: 'Developed with react, javascript and CSS. A website used for event and venue registration.',
    technologies: ['Vite', 'React', 'Typescript', 'mySQL'],
    link: 'https://departments-data-collection.vercel.app/'
  },
  {
    image: calculator,
    title: 'React Calculator App',
    description: 'Developed with HTML, CSS, javascript and react. It can do basic mathematical calculation with ease.',
    technologies: ['HTML', 'CSS', 'Javascript', 'React'],
    link: 'https://codepen.io/Hamid6426/pen/NWVvyML'
  },
  {
    image: drum,
    title: 'React Drum Machine',
    description: 'Developed with HTML, CSS, javascript and react.  Work like a drum kit with various sounds and settings.',
    technologies: ['HTML', 'CSS', 'Javascript', 'React'],
    link: 'https://codepen.io/Hamid6426/pen/oNReEoL'
  }
  // Add more projects here
];

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handlePreviousProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1));
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1));
  };

  const currentProject = projectsData[currentProjectIndex];

return (
  <Container  id="projects" maxWidth="md" sx={{ bgcolor: '#000011' }}>
    <Typography variant="h2" color="primary" gutterBottom align="center" sx={{ mb: 4, mt: 3, }}>Projects</Typography>
    <Card sx={{ bgcolor: '#000000', color: '#ffffff', mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'left', margin: 'auto', height: 'auto' }}>
      <CardMedia 
        component='img'
        src={currentProject.image}
        alt={currentProject.title}
        maxWidth="md"
        sx={{ mb: 2, height: 'auto' }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {currentProject.title}
        </Typography>
        <Typography variant="body2" paragraph>
          {currentProject.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Technologies Used: {currentProject.technologies.join(', ')}
        </Typography>
      </CardContent>
    </Card>
    <Box sx={{ bgcolor: '#000000', mb: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', height: 'auto' }}>
      <IconButton onClick={handlePreviousProject} aria-label="previous project" alignItems="flex-end">
        <ArrowBackIosIcon sx={{ color: '#ffffff' }} />
      </IconButton>
      <IconButton onClick={handleNextProject} aria-label="next project">
        <ArrowForwardIosIcon sx={{ color: '#ffffff' }} />
      </IconButton>
    </Box>
  </Container>
  );
};

export default Projects;
