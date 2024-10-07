import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


function ViewBookingModal({ show, handleClose, booking, refreshBookings, onDeletedBooking  }) {
    if (!booking) return null


    
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await axios.delete(`https://35e2a87b-a991-4a80-ba94-a137ad78a70d-00-iz64krywffiw.pike.replit.dev/bookings/${booking.id}`);
                refreshBookings(); 
                onDeletedBooking()
                handleClose(); 
            } catch (error) {
                console.error('Error deleting booking:', error);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Booking Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Title:</strong> {booking.title}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Description:</strong> {booking.description}</p>
                <p><strong>Phone Number:</strong> {booking.phone_number}</p>
                <p><strong>Email:</strong> {booking.email}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                   Cancel booking
                </Button>
          
            </Modal.Footer>
        </Modal>
    );
}

export default ViewBookingModal;
