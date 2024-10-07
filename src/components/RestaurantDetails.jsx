import { Container, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faMapMarkerAlt, faShirt } from '@fortawesome/free-solid-svg-icons'; // Import icons


const RestaurantDetails = () => {
  const branchDetails = {
    seats: "12 seats",
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
    {/* FontAwesome Icon for Map Marker */}
    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '1px', color: 'grey' }} />
    {/* Location Text */}
    <h6 style={{ color: 'grey', margin: '0 15px 0' }}>Kuala Lumpur, MY</h6>

    {/* Optional Utensils Icon */}
    <FontAwesomeIcon icon={faUtensils} style={{ marginLeft: '15px', color: 'grey' }} />
    <h6 style={{ color: 'grey', margin: '12px' }}> Sushi, Fine Dining</h6>

  <FontAwesomeIcon icon={faShirt} style={{ marginLeft: '15px', color: 'grey' }} />
    <h6 style={{ color: 'grey', margin: '12px' }}> Smart Casual</h6>
  </div>


          <Table className="mt-4" bordered>
            <tbody>
              <tr>
                <td><strong>Seats</strong></td>
                <td>{branchDetails.seats}</td>
              </tr>
              <tr>
                <td><strong>Operation Hours</strong></td>
                <td>{branchDetails.operationHours}</td>
              </tr>
              <tr>
                <td><strong>Dress code</strong></td>
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
      </Row>
    </Container>
  );
};

export default RestaurantDetails;
