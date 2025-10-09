import { useEffect, useState } from "react";
import electronicsImg from '../assets/img/electronics_carousel.jpg';
import jewelryImg from '../assets/img/jewelry_carousel.jpg';
import placeholderImg from '../assets/img/Placeholder.jpg';

export const Carousel = () => {

    return (

        // <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        //     <div className="carousel-inner">
        //         <div className="carousel-item active">
        //             <img src={electronicsImg} className="d-block w-100" alt="electronics image"></img>
        //         </div>
        //         <div className="carousel-item">
        //             <img src={jewelryImg} className="d-block w-100" alt="jewelry"></img>
        //         </div>
        //         <div className="carousel-item">
        //             <img src={placeholderImg} className="d-block w-100" alt="mens clothing"></img>
        //         </div>
        //         <div className="carousel-item">
        //             <img src={placeholderImg} className="d-block w-100" alt="womens clothing"></img>
        //         </div>
        //     </div>
        // </div>



        <div id="carouselExampleFade" class="carousel slide carousel-fade">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src={electronicsImg} class="d-block w-100" alt="..."></img>
                </div>
                <div class="carousel-item">
                    <img src={placeholderImg} class="d-block w-100" alt="..."></img>
                </div>
                <div class="carousel-item">
                    <img src={placeholderImg} class="d-block w-100" alt="..."></img>
                </div>
                <div class="carousel-item">
                    <img src={placeholderImg} class="d-block w-100" alt="..."></img>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

    );
};