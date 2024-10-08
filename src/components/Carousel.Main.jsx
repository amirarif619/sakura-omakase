import Carousel from 'react-bootstrap/Carousel';
import shrimpPic from '../assets/shrimp.jpg';
import nigiriPic from '../assets/nigiri.jpg'
function CarouselMain() {
  return (
    <Carousel fade>
    <Carousel.Item >
      <img 
        src={shrimpPic} 
        alt="Shrimp Dish"
        className="d-block w-100" 
      />
    </Carousel.Item>
    <Carousel.Item >
      <img 
        src={nigiriPic} 
        alt="Sushi Nigiri"
        className="d-block w-100"
      />
    </Carousel.Item>
  </Carousel>
  );
}

export default CarouselMain;