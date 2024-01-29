// Carousel.js
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

const Carousel = ({ images, autoPlay, interval }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setProgress(0);
    };

    const goToPrevSlide = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        goToSlide(prevIndex);
    };

    const goToNextSlide = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        goToSlide(nextIndex);
    };

    const startAutoPlay = () => {
        intervalRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress === 100) {
                    goToNextSlide();
                    return 0;
                }
                return prevProgress + (100 / (interval / 1000));
            });
        }, 1000);
    };

    const stopAutoPlay = () => {
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        if (autoPlay) {
            startAutoPlay();
        }

        return () => {
            stopAutoPlay();
        };
    }, [autoPlay]);

    useEffect(() => {
        if (autoPlay) {
            stopAutoPlay();
            startAutoPlay();
        }
    }, [currentIndex]);

    return (
        <div className="carousel-container">
            {autoPlay && (
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            )}
            <div className="dots-container">
                {images.map((_, index) => (
                    <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)}></span>
                ))}
            </div>
            <img className="carousel-image" src={images[currentIndex]} alt={`slide ${currentIndex + 1}`} />
            {/*<br />*/}
            {/*<br />*/}
            <button className="carousel-btn carousel-btn--prev" onClick={goToPrevSlide}>
                &lt;
            </button>
            <button className="carousel-btn carousel-btn--next" onClick={goToNextSlide}>
                &gt;
            </button>
        </div>
    );
};

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
};

Carousel.defaultProps = {
    autoPlay: false,
    interval: 3000,
};

export default Carousel;
