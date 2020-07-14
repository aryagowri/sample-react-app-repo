import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './BootstrapCarousel.module.css';
import CarouselImage1 from '../../assets/images/carousel-img-1.jpg';
import CarouselImage2 from '../../assets/images/carousel-img-2.jpg';
import CarouselImage3 from '../../assets/images/carousel-img-3.jpg';
/***Carousel --Home Page*/
const BootstrapCarousel = () => {
    return (
        <div className={["container-fluid", styles.CarouselWrapper].join(" ")}>
            
            <Carousel>
                <Carousel.Item style={{height: '400px'}}>
                    <img src={CarouselImage1} className="d-block w-100" style={{height: '400px'}} alt="nature" />
                    <Carousel.Caption style ={{top: '75%'}}>
                        <h2>
                            Demo-1
                        </h2>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{height: '300'}}>
                    <img src={CarouselImage2} className="d-block w-100" style={{height: '400px'}} alt="nature" />
                    <Carousel.Caption style ={{top: '75%'}}>
                        <h2>
                            Demo-2
                        </h2>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{height: '300'}}>
                    <img src={CarouselImage3} className="d-block w-100" style={{height: '400px'}} alt="nature" />
                    <Carousel.Caption style ={{top: '75%'}}>
                        <h2>
                            Demo-3
                        </h2>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
export default BootstrapCarousel;