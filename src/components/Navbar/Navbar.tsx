import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLogout } from '../../hooks/useLogout';
import ChatButton from "../../features/chat/components/ChatButton.tsx";
import {useNavigate} from "react-router-dom";

function NavbarComponent({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const handleLogout = useLogout();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Admistation-System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  className="justify-content-end">
          <Nav className="me-end justify-content-space-between">
              {children}
            <Button onClick={() => navigate('employee')} style={{
              margin: 10
            }}>Profile</Button>
            <ChatButton />
            <Button variant="outline-primary" onClick={handleLogout} style={{margin:10}}>
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;