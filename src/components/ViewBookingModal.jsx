import axios from 'axios';
import { useState , useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function ViewBookingModal({ show, handleClose, booking, refreshBookings, onDeletedBooking,  handleEditedBookingCompleted  }) {
   
    const [isEditing, setIsEditing] = useState(false); 
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        phone_number: '',
        email: '',
    });



     useEffect(() => {
        if (booking) {
            setFormData({
                title: booking.title || '',
                description: booking.description || '',
                date: booking.date || '',
                time: booking.time || '',
                phone_number: booking.phone_number || '',
                email: booking.email || '',
            });
        }
    }, [booking]);

    if (!booking) {
        return null;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSave = async () => {
        try {
            await axios.put(`https://1d07bdaa-ce73-463b-8de7-111ccb00dd02-00-3g0n80mknuo06.sisko.replit.dev/bookings/${booking.id}`, formData);
            refreshBookings(); 
            handleClose(); 
            setIsEditing(false); 
            handleEditedBookingCompleted()
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await axios.delete(`https://1d07bdaa-ce73-463b-8de7-111ccb00dd02-00-3g0n80mknuo06.sisko.replit.dev/bookings/${booking.id}`);
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
                {isEditing ? (
                  
                    <Form>
                        <Form.Group controlId="formBranch">
    <Form.Label>Restaurant Branch</Form.Label>
    <Form.Select
        name="title"  
        value={formData.title}
        onChange={handleChange}
        required
    >
        <option value="">Select a branch</option>
        <option value="Sakura Omakase - The Troika">Sakura Omakase - The Troika</option>
        <option value="Sakura Omakase - Pavilion">Sakura Omakase - Pavilion</option>
        <option value="Sakura Omakase - Menara KL">Sakura Omakase - Menara KL</option>
    </Form.Select>
</Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Form>
                ) : (
                    // If not in edit mode, show static details
                    <>
                        <p><strong>Title:</strong> {booking.title}</p>
                        <p><strong>Date:</strong> {booking.date}</p>
                        <p><strong>Time:</strong> {booking.time}</p>
                        <p><strong>Special Instructions:</strong> {booking.description}</p>
                        <p><strong>Phone Number:</strong> {booking.phone_number}</p>
                        <p><strong>Email:</strong> {booking.email}</p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                {isEditing ? (
                    <>
                        <Button variant="success" onClick={handleSave}>Save Changes</Button>
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Booking</Button>
                        <Button variant="danger" onClick={handleDelete}>Cancel Booking</Button>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ViewBookingModal;
