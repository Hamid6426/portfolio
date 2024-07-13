import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  MenuItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/H-Hamid-blue-with-white-strip.svg';
import About from './About'; 
import Projects from './Projects'; 
import Footer from './Footer'; 
import Resume from './Resume'; 

function Header({ mode }) {
  const [open, setOpen] = React.useState(false);
  
  const logoStyle = {
    width: '120px',
    height: 'auto',
    cursor: 'pointer',
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          boxShadow: 4,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor: '#000',
              backdropFilter: 'blur(24px)',
              paddingY: 5,
              height: 40,
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-8px',
                px: 0,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  ml: '20px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >  
                <img
                  src={logo}
                  style={logoStyle}
                  alt="logo"
                />
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem onClick={() => scrollToSection('about')}>
                  <Typography variant="body1" color="text.primary">
                    About
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('projects')}>
                  <Typography variant="body1" color="text.primary">
                    Projects
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('footer')}>
                  <Typography variant="body1" color="text.primary">
                    Contact
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('resume')}>
                  <Typography variant="body1" color="text.primary">
                    Resume
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            ></Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <MenuItem onClick={() => scrollToSection('about')}>
                      About
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => scrollToSection('projects')}>
                      Projects
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => scrollToSection('footer')}>
                      Contact
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => scrollToSection('resume')}>
                      Resume
                    </MenuItem>
                    <Divider />
                  </Box>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
