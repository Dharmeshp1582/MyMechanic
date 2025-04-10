import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/landing/css/slidersection.css"
import sliderImage from "../../assets/landing/images/slider-img.png";

export const SliderSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
      {
        title: "My-Mechanic",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking.",
        image: sliderImage,
      },
      {
        title: "The Best Marketing",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking.",
        image: sliderImage,
      },
      {
        title: "Quality Service",
        description:
          "We ensure high-quality service for all vehicles with expert professionals and advanced tools.",
        image: sliderImage,
      },
    ];
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
  
    useEffect(() => {
      const autoSlide = setInterval(() => {
        nextSlide();
      }, 4000); // Auto slide every 4 seconds
  
      return () => clearInterval(autoSlide);
    }, []);

    return (
      <section className="slider-section">
        <div className="carousel">
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item ${index === currentSlide ? "active" : ""}`}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-left">
                      <div className="detail-box">
                        <h1>{slide.title}</h1>
                        <p>{slide.description}</p>
                        <div className="btn-box">
                          <Link to="/contactus" className="btn btn-primary">
                            Contact Us
                          </Link>
                          <Link to="/login" className="btn btn-secondary">
                            Go To Dashboard
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-right">
                      <div className="img-box">
                        <img src={slide.image} alt={slide.title} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Navigation Buttons */}
          <div className="carousel-btn-container">
            <button className="carousel-control-prev" onClick={prevSlide} aria-label="Previous" style={{background:"none"}}>
              <i className="bi bi-chevron-left"></i>
            </button>
            <button className="carousel-control-next" onClick={nextSlide} aria-label="Next" style={{background:"none"}}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
    );
};
