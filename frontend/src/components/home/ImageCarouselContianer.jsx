import React from "react";
import "./imagecarousel.css";

const ImageCarouselContainer = ({ item }) => {
  return (
    <div className="imagecarousel-container">
      <div className="imagecarousel-items">
        <div className="imagecarousel-item">
          <div className="carousel-image">
            <img src={item.image} alt={item.name} />
          </div>
          <h2 className="employee-name">{item.name}</h2>
          <p className="profession">{item.job}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCarouselContainer;
