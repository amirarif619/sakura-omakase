import { Alert, Button, Card } from "react-bootstrap";
import ReserveModal from "../components/ReserveModal";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import nigiriImage from '../assets/nigiri.jpg';
import sakuraImage from '../assets/sakura.png';
import ViewBookingModal from "../components/ViewBookingModal"

import './MainPage.css';
import axios from 'axios';


export default function MainPage() {

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [showImage, setShowImage] = useState(false);
    const [loading, setLoading] = useState(true)
    const [bookings, setBookings] = useState([])
    const [confirmationMessage, setConfirmationMessage] = useState(''); 
    const [showConfirmation, setShowConfirmation] = useState(false); 

    const [selectedBooking, setSelectedBooking] = useState(null); 
    const [showBookingModal, setShowBookingModal] = useState(false);
    
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://35e2a87b-a991-4a80-ba94-a137ad78a70d-00-iz64krywffiw.pike.replit.dev/bookings')
                setBookings(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching bookgins:', error)
                setLoading(false)
            }
        }
    

    useEffect(() => {
        fetchBookings();
}, []);


    useEffect(() => {
      const timer = setTimeout(() => {
        setShowImage(true);
      }, 500);

      return () => clearTimeout(timer);
    }, []);

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking); //
        setShowBookingModal(true); // Open the view details modal
    };

    const handleCloseBookingModal = () => {
        setSelectedBooking(null); // Clear the selected booking
        setShowBookingModal(false); // Close the modal
    };

    const handleBookingCompleted = () => {
        setConfirmationMessage("Booking completed! See you soon!");
        setShowConfirmation(true);

        setTimeout(() => {
            setShowConfirmation(false);
        }, 5000);
    };

    const handleDeletedBookingCompleted = () => {
        setConfirmationMessage("Booking deleted! We're sorry you couldn't make it!");
        setShowConfirmation(true);

        setTimeout(() => {
            setShowConfirmation(false);
        }, 5000);
    };

    const handleEditedBookingCompleted = () => {
        setConfirmationMessage("Booking updated successfully! See you soon!");
        setShowConfirmation(true);
    
        setTimeout(() => {
            setShowConfirmation(false);
        }, 5000); // Hide the confirmation after 5 seconds
    };

    return (
        <>
        <Container fluid className="p-0 m-0">
          
            <Row className="vh-50">
                <Col className="p-0">
                    <img 
                        src={nigiriImage} 
                        alt="Sushi Nigiri" 
                        className={`img-fluid w-100 h-100 ${showImage ? 'fade-in' : 'fade-out'}`} 
                    />
                </Col>
            </Row>
            </Container>


            <Container className="mt-5">

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

            {showConfirmation && (
                <Row>
                    <Col>
                        <Alert variant="success" className="text-center">
                            {confirmationMessage}
                        </Alert>
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
            <h1 className="mb-5">Bookings List</h1>
            </Col>

            </Row>
            <Row>
                {loading ? (
                    <p>Loading bookings...</p> 
                ) : bookings.length === 0 ? (
                    <p>No bookings available</p> 
                ) : (
                    bookings.map((booking) => (
                        <Col key={booking.id} xs={12} md={4} lg={3} className="mb-4">
                            <Card >
                                <Card.Img variant="top" src={sakuraImage} className="img-fluid"/>
                                <Card.Body>
                                    <Card.Title>{booking.title}</Card.Title>
                                    <Card.Text>Date: {booking.date}</Card.Text>
                                    <Card.Text>Date: {booking.date}</Card.Text>
                                    <Card.Text>Description: {booking.description}</Card.Text>
                                    <Button variant="danger" onClick={() => handleViewDetails(booking)} >View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>

        <ReserveModal 
        show={showModal} 
        handleClose={handleClose} 
        refreshBookings={fetchBookings}
        onBookingCompleted={handleBookingCompleted}  />

<ViewBookingModal 
            show={showBookingModal} 
            handleClose={handleCloseBookingModal} 
            booking={selectedBooking} 
            refreshBookings={fetchBookings}
            onDeletedBooking={handleDeletedBookingCompleted}
            handleEditedBookingCompleted={handleEditedBookingCompleted}
        />      

</>
)
            }