import { useEffect, useState } from "react";
import electronicsImg from '../assets/img/electronics_carousel.jpg';
import jewelryImg from '../assets/img/jewelry_carousel.jpg';
import placeholderImg from '../assets/img/Placeholder.jpg';

export const Carousel = () => {

    return (

        // <div id="carouselExampleSlidesOnly" classNameName="carousel slide" data-bs-ride="carousel">
        //     <div classNameName="carousel-inner">
        //         <div classNameName="carousel-item active">
        //             <img src={electronicsImg} classNameName="d-block w-100" alt="electronics image"></img>
        //         </div>
        //         <div classNameName="carousel-item">
        //             <img src={jewelryImg} classNameName="d-block w-100" alt="jewelry"></img>
        //         </div>
        //         <div classNameName="carousel-item">
        //             <img src={placeholderImg} classNameName="d-block w-100" alt="mens clothing"></img>
        //         </div>
        //         <div classNameName="carousel-item">
        //             <img src={placeholderImg} classNameName="d-block w-100" alt="womens clothing"></img>
        //         </div>
        //     </div>
        // </div>



        <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={electronicsImg} className="d-block w-100" alt="..."></img>
                </div>
                <div className="carousel-item">
                    <img src={placeholderImg} className="d-block w-100" alt="..."></img>
                </div>
                <div className="carousel-item">
                    <img src={placeholderImg} className="d-block w-100" alt="..."></img>
                </div>
                <div className="carousel-item">
                    <img src={placeholderImg} className="d-block w-100" alt="..."></img>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    );
};