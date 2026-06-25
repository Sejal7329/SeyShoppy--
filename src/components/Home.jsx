import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "SUMMER COLLECTION",
      subtitle: "Experience minimalist luxury tailored for modern living.",
      btnText: "Shop Women",
      link: "/women/all",
      image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=1600&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "ESSENTIAL ESSENTIALS",
      subtitle: "Refined details and effortless silhouettes for men.",
      btnText: "Shop Men",
      link: "/men/all",
      image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1600&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "RESORT COMPLEMENTS",
      subtitle: "Elevate your look with curated bags and luxury.",
      btnText: "Explore Accessories",
      link: "/accessories/all",
      image: "https://wallpaperaccess.com/full/8557666.jpg"
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    
      <div className="slider-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${slide.image})` }}
          >
            <div className="slide-content">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button 
                className="slide-btn" 
                onClick={() => navigate(slide.link)}
              >
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}

        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
   
  );
}