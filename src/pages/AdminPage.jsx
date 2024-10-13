import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import MainNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 


  const checkAdminStatus = async (currentUser) => {
    
    const isAdmin = currentUser?.email === 'admin@admin.com';
    if (!isAdmin) {
      navigate('/');  
    }
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        checkAdminStatus(currentUser); 
      } else {
        navigate('/'); 
      }
    });

    return () => unsubscribe();  
  }, [navigate]);

  useEffect(() => {
    if (user) {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get('https://1d07bdaa-ce73-463b-8de7-111ccb00dd02-00-3g0n80mknuo06.sisko.replit.dev/bookings/all');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchAllBookings();
 }
  }, [user]);

  return (
    <>
      <MainNavbar />
      <div className="container mt-5">
        <h1 className="mb-5">Admin Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Special Instructions</th>
                <th>Branch</th>
                <th>Date</th>
                <th>Time</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.description}</td>
                  <td>{booking.title}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.phone_number}</td>
                  <td>{booking.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <Footer />
    </>
  );
}
