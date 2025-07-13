import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
const images = [
  '/images/carousel_1.jpg',
  '/images/carousel_2.jpg',
  '/images/carousel_3.jpg',
];

function Homecarousel() {
   const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
     <div className=" mx-auto overflow-hidden shadow-lg">
      <div className="relative h-[60vh]">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? 'opacity-100 z-10' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Homecarousel;