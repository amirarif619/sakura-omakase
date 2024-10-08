import { Container, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faMapMarkerAlt, faShirt } from '@fortawesome/free-solid-svg-icons'; // Import icons


const RestaurantDetails = () => {
  const branchDetails = {
    waitlist: "6-8 months",
    seats: "16 seats",
    operationHours: "[Lunch] Thurs - Sat: 11:30 ~ [Dinner] Tues - Fri: 18:00 ~",
    regularHoliday: "Closed",
    ageRestriction: "21 years and older",
    paymentMethods: "Payment on the day: Cash, Credit Card, Touch 'n' Go",
    byob: "Not allowed",
    dressCode: "Smart Casual. We kindly request no shorts, slippers or sandals to preserve the dining ambiance."
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="mb-3">Dining details</h1>

          <div style={{ display: 'flex', alignItems: 'center' }}>
   
    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '1px', color: 'grey' }} />
  
    <h6 style={{ color: 'grey', margin: '0 15px 0' }}>Kuala Lumpur, MY</h6>

    <FontAwesomeIcon icon={faUtensils} style={{ marginLeft: '15px', color: 'grey' }} />
    <h6 style={{ color: 'grey', margin: '12px' }}> Japanese Fusion, Fine Dining</h6>

  <FontAwesomeIcon icon={faShirt} style={{ marginLeft: '15px', color: 'grey' }} />
    <h6 style={{ color: 'grey', margin: '12px' }}> Smart Casual</h6>
  </div>


          <Table className="mt-4" bordered>
            <tbody>
            <tr>
                <td><strong>Waitlist</strong></td>
                <td>{branchDetails.waitlist}</td>
              </tr>
              <tr>
                <td><strong>Seat Capacity</strong></td>
                <td>{branchDetails.seats}</td>
              </tr>
              <tr>
                <td><strong>Operation Hours</strong></td>
                <td>{branchDetails.operationHours}</td>
              </tr>
              <tr>
                <td><strong>Dress Code</strong></td>
                <td>{branchDetails.dressCode}</td>
              </tr>
              <tr>
                <td><strong>Public Holiday</strong></td>
                <td>{branchDetails.regularHoliday}</td>
              </tr>
              <tr>
                <td><strong>Age Restriction</strong></td>
                <td>{branchDetails.ageRestriction}</td>
              </tr>
              <tr>
                <td><strong>Payment Methods</strong></td>
                <td>{branchDetails.paymentMethods}</td>
              </tr>
              <tr>
                <td><strong>Pets</strong></td>
                <td>{branchDetails.byob}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      <h8 className="text-muted mt-2 mb-5">* Please arrive with your full party five minutes before your reservation to ensure a seamless and enjoyable experience </h8>
      </Row>
    </Container>


  );
};

export default RestaurantDetails;
