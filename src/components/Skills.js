import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';

const skillsData = {
  frontEnd: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React', 'Material-UI', 'jQuery', 'SASS'],
  backEnd: ['Node.js', 'Express', 'MongoDB', 'postgreSQL', 'mySQL', 'REST APIs', 'PHP'],
  noCode: ['Webflow', 'WordPress', 'Elementor', 'Divi Builder'],
  uxDesign: ['Figma', 'Adobe XD', 'Sketch', 'Wireframing', 'Prototyping', 'Micro-interactions', 'Color Theory'],
};

const Skills = () => {
  return (
      <Container maxWidth="lg" sx={{ bgcolor: '#000000', color: '#ffffff', pb: 6, pt: 1, borderLeft: 'solid 4px blue', borderRight: 'solid 4px blue' }}>
        <Typography variant="h2" gutterBottom color="primary" align="center" sx={{ mb: 4, mt:4, }}>
          Skills
        </Typography>
        <Grid container spacing={0} justifyContent="space-evenly">
          
          <Grid item xs={12} md={2}>
            <Box>
              <Typography variant="h4" gutterBottom mt={4}>
                Front-End Dev
              </Typography>
              {skillsData.frontEnd.map((skill, index) => (
                <Typography key={index} variant="h6">
                  {skill}
                </Typography>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Box>
              <Typography variant="h4" gutterBottom mt={4}>
                Back-End Dev
              </Typography>
              {skillsData.backEnd.map((skill, index) => (
                <Typography key={index} variant="h6">
                  {skill}
                </Typography>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Box>
              <Typography variant="h4" gutterBottom mt={4}>
                No-Code Dev
              </Typography>
              {skillsData.noCode.map((skill, index) => (
                <Typography key={index} variant="h6">
                  {skill}
                </Typography>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Box>
              <Typography variant="h4" gutterBottom mt={4}>
                UX / UI Design
              </Typography>
              {skillsData.uxDesign.map((skill, index) => (
                <Typography key={index} variant="h6">
                  {skill}
                </Typography>
              ))}
            </Box>
          </Grid>

        </Grid>
      </Container>
  );
};

export default Skills;
