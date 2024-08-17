import React, { useEffect, useState } from "react"
import "./categories.css";
import SearchedCard from "./cards/SearchedCard";
import { Categoriesdata } from "../data/Categoriesdata"; // Import your data
import PopularCard from "./cards/PopularCard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Homesearch from "./Homesearch";
import { useSearchParams } from "react-router-dom";
import Card from "../Browsejob/Card";


const Categories = () => {
  // Example search data with unique indices
  const searchdata = [0, 1, 2, 3, 4,5];
   const popularCategory=[0,1,2,3,4,5,6,7]

   

  return (
    <section className="categories">
      <div className="category-container">
        <div className="findjob-container">
           <Homesearch/>
          <div className="popular-search-container">
            <h3 className="popular-search">Popular Search</h3>
            <div className="cards">
              {searchdata.map((index) => (
                <SearchedCard key={index} item={Categoriesdata[index]} />
              ))}
            </div>
          </div>
        </div>
        <div className="popular-categories">
          <h2 className="popular-category-heading">popular category</h2>
          <div className="popular-category-item">
            {popularCategory.map((index) => (
              <PopularCard key={index} item={Categoriesdata[index]} />
            ))}
          </div>
        </div>
        <div className="categories-main-container">
          <h2 className="category-title"> get your easy steps to process</h2>
          <div className="categories-items">
            <div className="category-1 category-item">
              <div className="oppurtunity-cons">
                <ExploreIcon  className="opportunity-icon" />
              </div>
              <div className="oppurtunity-content-container">
                <h4 className="opportunity-title">apply for exiting oppurtunity</h4>
                <p className="opportunity-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  tempora non autem unde, officia molestiae?
                </p>
              </div>
            </div>
            <div className="category-2 category-item">
              <div className="oppurtunity-cons">
                <ApartmentIcon className="opportunity-icon" />
              </div>
              <h4 className="opportunity-title">get hired by top comapanies</h4>
              <p className="opportunity-content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
                quae laudantium perspiciatis eaque numquam quos?
              </p>
            </div>
            <div className="category-3 category-item">
              <div className="oppurtunity-cons">
                <AccountCircleIcon  className="opportunity-icon" />
              </div>
              <h4 className="opportunity-title">unlock your career potential</h4>
              <p className="opportunity-content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
                quae laudantium perspiciatis eaque numquam quos?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
