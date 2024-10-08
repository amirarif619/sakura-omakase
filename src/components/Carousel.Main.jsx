import Carousel from 'react-bootstrap/Carousel';
import shrimpPic from '../assets/shrimp.jpg';
import nigiriPic from '../assets/nigiri.jpg'
import restaurantPic from '../assets/restaurant.jpg'

function CarouselMain() {
  return (
    <Carousel fade>
    <Carousel.Item interval={2000} >
      <img 
        src={shrimpPic} 
        alt="Shrimp Nigiri"
        className="d-block w-100" 
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img 
        src={restaurantPic} 
        alt="Restaurant"
        className="d-block w-100" 
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img 
        src={nigiriPic} 
        alt="Tuna Nigiri"
        className="d-block w-100"
      />
    </Carousel.Item>
  </Carousel>
  );
}

export default CarouselMain;