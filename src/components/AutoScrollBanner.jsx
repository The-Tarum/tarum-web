import React, { useState, useEffect } from 'react';
import SaleImage from "../assets/sale.jpg";

const AutoScrollBanner = () => {
  const totalSlides = 5;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideDuration = 3000; // 3 seconds per slide

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, slideDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative group">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ 
          width: `${totalSlides * 100}%`,
          transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`
        }}
      >
        {[...Array(totalSlides)].map((_, i) => (
          <div 
            key={i}
            className="flex-shrink-0"
            style={{ width: `${100 / totalSlides}%` }}
          >
            <div className="h-[150px] mx-3 flex items-center justify-center">
              <img 
                src={SaleImage} 
                className="w-full h-full object-cover rounded-xl"
                alt={`Sale ${i + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollBanner;