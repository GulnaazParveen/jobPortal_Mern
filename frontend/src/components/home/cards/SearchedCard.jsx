import React from "react";

import "./searchedcard.css"
const SearchedCard = ({ item }) => {
  return (
    <div className="card">
      <p>{item.title}</p>
    </div>
  );
};

export default SearchedCard;
