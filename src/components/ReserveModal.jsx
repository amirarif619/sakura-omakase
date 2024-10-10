import axios from 'axios';
import { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import PhoneInput from 'react-phone-input-2'; // Import the PhoneInput component
import 'react-phone-input-2/lib/style.css';

function ReserveModal({ show, handleClose, refreshBookings, onBookingCompleted, userId }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        phone_number: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

          const bookingData = {
            ...formData,
            user_id: userId, 
        };

          const response = await axios.post('https://1d07bdaa-ce73-463b-8de7-111ccb00dd02-00-3g0n80mknuo06.sisko.replit.dev/bookings', bookingData);

          console.log('Booking created', response.data)

          setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
            phone_number: '',
            email: ''
          });
          
          refreshBookings();
          onBookingCompleted()
          handleClose(); 
        } catch (error) {
          console.error('Error creating booking:', error);
          
        }
      };


    return (
        <Modal 
        fullscreen="sm-down"
        dialogClassName="modal-dialog-centered" 
        show={show} 
        onHide={handleClose}
        style={{ overflowY: 'auto', maxHeight: '100vh', width: '100%' }}
        >
        <Modal.Header closeButton>
          <Modal.Title className=" w-100 text-center">🍣 Make a Reservation 🍣</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <Form onSubmit={handleSubmit}>


            <Form.Group  className="mb-4" controlId="formBranch">
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

            <Form.Group  className="mb-4" controlId="formDescription">
              <Form.Label>Special Instructions*</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group  className="mb-4" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group  className="mb-4" controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group  className="mb-4" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <PhoneInput
             country={'my'} 
            value={formData.phone_number}
            onChange={(phone) => setFormData({ ...formData, phone_number: phone })}
            required
            />
            </Form.Group>

            <Form.Group  className="mb-3"controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
               <Form.Text  className="text-muted mt-4">
    *While we will make every effort to accommodate special requests, we cannot guarantee their fulfillment. For any specific dietary requirements, kindly detail them in the Special Instructions section.
  </Form.Text>
            </Form.Group>


            <Button className="mt-3 mb-3" type="submit" variant="danger">Reserve</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  
export default ReserveModal;