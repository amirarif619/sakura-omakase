import { Button } from "react-bootstrap";
import ReserveModal from "../components/ReserveModal";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import nigiriImage from '../assets/nigiri.jpg';
import './MainPage.css';

export default function MainPage() {
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowImage(true);
      }, 500);

      return () => clearTimeout(timer);
    }, []);

    return (
        <Container fluid className="p-0 m-0">
            {/* Top Row for Image */}
            <Row className="vh-50">
                <Col className="p-0">
                    <img 
                        src={nigiriImage} 
                        alt="Sushi Nigiri" 
                        className={`img-fluid w-100 h-100 ${showImage ? 'fade-in' : 'fade-out'}`} 
                    />
                </Col>
            </Row>

            {/* Bottom Row for Content */}
            <Row className="vh-50 d-flex align-items-center justify-content-center">
                <Col className="text-center">
                    <h1 className="mt-5 mb-4">
                        Elevate your dining experience at <strong>Sakura Omakase</strong>. 
                        Reserve your table now for a night of exquisite tastes and unforgettable moments!
                    </h1>
                    <Button className="mt-5 mb-5" onClick={handleShow} variant="danger">
                        Make a reservation
                    </Button>
                    <ReserveModal show={showModal} handleClose={handleClose} />
                </Col>
            </Row>
        </Container>
    );
}
