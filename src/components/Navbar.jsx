import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import mangekyoLogo from '../assets/mangekyo.png'
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase'; 

export default function MainNavbar({ onShowLogin, onShowSignUp}) {
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  // Handle log out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Reset the user state after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
            
         {!user ? (
            <>
                  <Nav.Link href="#" onClick={onShowLogin}>Log In</Nav.Link>
                <Nav.Link href="#" onClick={onShowSignUp}>Sign Up</Nav.Link>
              </>
            ) : (
            
              <>
                <Nav.Link disabled>{user.email}</Nav.Link>
                <Nav.Link href="#" onClick={handleLogout}>Log Out</Nav.Link>
              </>
            )}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
