import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import asset1 from "../img/asset 1.jpeg";
import asset2 from "../img/asset 2.jpeg";
import asset3 from "../img/asset 3.jpeg";

const CustomCarousel = () => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };

   return (
      <div>
         <Slider {...settings}>
            <div>
               <img src={asset1} alt="Slide 1" />
            </div>
            <div>
               <img src={asset2} alt="Slide 2" />
            </div>
            <div>
               <img src={asset3} alt="Slide 3" />
            </div>
         </Slider>
      </div>
   );
};

export default CustomCarousel;
