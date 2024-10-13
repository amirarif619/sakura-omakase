import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer mt-5 pt-5">
      <Container>
        <Row>
      
          <Col xs={12} md={3}>
            <h6>About SAKURA OMAKASE</h6>
            <ul className="list-unstyled">
              <li><a href="#">Company</a></li>
              <li><a href="#">For restaurants</a></li>
              <li><a href="#">We’re hiring!</a></li>
              <li><a href="#">Restaurant Jobs</a></li>
            </ul>
          </Col>


          <Col xs={12} md={3}>
            <h6>Help</h6>
            <ul className="list-unstyled">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>

          
          <Col xs={12} md={3}>
            <h6>Reservation</h6>
            <ul className="list-unstyled">
              <li><a href="#">Japan Eatinerary</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Sign up here</a></li>
              <li><a href="#">Find restaurants</a></li>
              <li><a href="#">View reservations</a></li>
              <li><a href="#">Premium Program</a></li>
            </ul>
          </Col>

        
          <Col xs={12} md={3}>
            <h6>Legal</h6>
            <ul className="list-unstyled">
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">GDPR Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Legal notes</a></li>
            </ul>
          </Col>
        </Row>

        
        <Row className="mt-4">
          <Col xs={12} md={6}>
            <p className="text-muted">&copy; 2024 SAKURA OMAKASE</p>
          </Col>
          <Col xs={12} md={6} className="text-md-end">
        
            <a href="#" className="me-2"><i className="bi bi-facebook"></i></a>
            <a href="#" className="me-2"><i className="bi bi-instagram"></i></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
