import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarouselContainer from "./ImageCarouselContianer";
import "./imageslider.css"

const SliderContent = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0LcAQ5ZULAt5DxRVEA1SRJhvmHUx9FJ6uvw&s",
    name: "John",
    job: "Software Engineer",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPpRqMjLcgJ_1bTUyhOh4oUOKJgKs7gTbBqw&s",
    name: "Jane Smith",
    job: "Product Manager",
  },
  {
    image:
      "https://pbs.twimg.com/profile_images/1721311594087354368/xiy0Rz_7_400x400.jpg",
    name: "Sam Wilson",
    job: "Designer",
  },
  {
    image:
      "https://media.licdn.com/dms/image/D5603AQGMIYmHiDCAKA/profile-displayphoto-shrink_400_400/0/1701711120906?e=2147483647&v=beta&t=2VhWFbuVJyuDSprMBEkFzwPIIkEVfgv2oJ8ue-4Ih2A",
    name: "Nikhil",
    job: "Designer",
  },

];

const ImageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="sliders">
      <div className="slider-heading">
         features candidate
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {SliderContent.map((item, index) => (
            <ImageCarouselContainer key={index} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
