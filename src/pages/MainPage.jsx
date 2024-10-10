import { Alert, Button, Card } from "react-bootstrap";
import ReserveModal from "../components/ReserveModal";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import downtownImage from '../assets/Downtown.png';
import riversideImage from '../assets/Riverside.png';
import uptownImage from '../assets/Uptown.png';
import ViewBookingModal from "../components/ViewBookingModal"
import Footer from '../components/Footer';
import MainNavbar from "../components/Navbar";
import './MainPage.css';
import axios from 'axios';
import RestaurantDetails from "../components/RestaurantDetails";
import CarouselMain from "../components/Carousel.Main";
import LoginModal from "../components/LoginModal"
import { auth } from "../firebase"
import { onAuthStateChanged } from 'firebase/auth'

export default function MainPage() {


    const branchImages = {
        "Sakura Omakase - The Troika": downtownImage,
        "Sakura Omakase - Pavilion": uptownImage,
        "Sakura Omakase - Menara KL": riversideImage,
    };
    
    const [user, setUser] = useState(null);
    
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [showModal, setShowModal] = useState(false);
   
    
    const [loading, setLoading] = useState(true)
    const [bookings, setBookings] = useState([])
    const [confirmationMessage, setConfirmationMessage] = useState(''); 
    const [showConfirmation, setShowConfirmation] = useState(false); 

    const [selectedBooking, setSelectedBooking] = useState(null); 
    const [showBookingModal, setShowBookingModal] = useState(false);
    
   

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe(); // Clean up the listener on component unmount
      }, []);

    
      const fetchBookings = async () => {
          try {
              const response = await axios.get('https://1d07bdaa-ce73-463b-8de7-111ccb00dd02-00-3g0n80mknuo06.sisko.replit.dev/bookings')
              setBookings(response.data);
              setLoading(false)
            } catch (error) {
                console.error('Error fetching bookgins:', error)
                setLoading(false)
            }
        }
        
        
        
        useEffect(() => {
        fetchBookings();
    }, [])

const handleMakeReservation = () => {
    if (!user) {
      setShowLoginModal(true);  // Show login modal if not logged in
    } else {
      setShowModal(true);  // Show reservation modal if logged in
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);  // Close login modal after successful login
    setShowModal(true);  // Directly open reservation modal after login
  };

   
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
        <MainNavbar 
        onShowLogin={() => setShowLoginModal(true)} 
        />
        <Container fluid className="p-0 m-0">
          <CarouselMain />
            <Row className="vh-50">
                
                    
                
            </Row>
            </Container>


            <Container className="mt-5">

            <Row className="vh-50 d-flex align-items-center justify-content-center">
                <Col className="text-center">
                    <h1 className="mt-5 mb-4">
                        Elevate your dining experience at <strong>SAKURA OMAKASE</strong>. 
                        Reserve your table now for a night of exquisite tastes and unforgettable moments!
                    </h1>
                    <Button size="lg" className="mt-5 mb-5" onClick={handleMakeReservation} variant="danger">
                        Make a reservation
                    </Button>
                    <ReserveModal 
                    show={showModal} 
                    handleClose={() => setShowModal(false)}
                    refreshBookings={fetchBookings} 
                    onBookingCompleted={handleBookingCompleted} />
                    <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
                    
                </Col>
            </Row>
            
            <RestaurantDetails />
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
                            <Card className="fixed-card" >
                                <Card.Img 
                                variant="top" 
                                src={branchImages[booking.title]}
                                className="fixed-img"/>
                                <Card.Body className="fixed-card-body">
                                    <Card.Title className="mb-3">{booking.title}</Card.Title>
                                    <Card.Text>Date: {booking.date}</Card.Text>
                                    <Card.Text>Time: {booking.time} PM</Card.Text>
                                    <Button className="mt-3" variant="danger" onClick={() => handleViewDetails(booking)} >View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>

     

<ViewBookingModal 
            show={showBookingModal} 
            handleClose={handleCloseBookingModal} 
            booking={selectedBooking} 
            refreshBookings={fetchBookings}
            onDeletedBooking={handleDeletedBookingCompleted}
            handleEditedBookingCompleted={handleEditedBookingCompleted}
        />      
    <Footer/>
</>
)
            }