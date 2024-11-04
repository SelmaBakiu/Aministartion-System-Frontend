import { Box, Container } from '@mui/material';
import NavbarComponent from '../Navbar/Navbar';

const Layout = ({ children, navbarChildren }: { children: JSX.Element; navbarChildren?: React.ReactNode }) => {
  return (
    <Box>
      <NavbarComponent>{navbarChildren}</NavbarComponent>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;