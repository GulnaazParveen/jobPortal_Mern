import React from 'react'
import "./popularcard.css"
const PopularCard = ({item}) => {
    
  return (
    <div className="popular-card">
      <div className="category-name">{item.title}</div>
      <div className="category-content">
        <div className="available-position">{item.availablePositions}</div>
        <div className="available-text">Available</div>
      </div>
    </div>
  );
}

export default PopularCard
