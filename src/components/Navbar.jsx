import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import mangekyoLogo from '../assets/mangekyo.png'

export default function MainNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
    
      <Navbar.Brand>
  <div className="d-flex align-items-center">
    <img
      src={mangekyoLogo} 
      alt="Logo"
      height="30"
      className="d-inline-block align-top"
      style={{ marginRight: '10px' }} 
    />
    <span>SAKURA OMAKASE by A. A. Amaterasu Culinary Collective</span>
  </div>
</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
         

          <Nav className="ms-auto">
            <Nav.Link href="#">Takeaway/Delivery</Nav.Link>
            <Nav.Link href="#">Log in</Nav.Link>
            <Nav.Link href="#">Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
