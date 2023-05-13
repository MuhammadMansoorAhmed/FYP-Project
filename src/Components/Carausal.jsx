import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import kid from '../img/kids.jpg'
import parent from '../img/parents.jpg';
import donate from '../img/donate.jpg';

const Carausal = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100 vh-100"
          src={kid}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 vh-100"
          src={parent}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 vh-100"
          src={donate}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carausal;
