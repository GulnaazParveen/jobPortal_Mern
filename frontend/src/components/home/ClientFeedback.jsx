import React from 'react';
import "./clientFeedback.css"
import testinomialImage from "../images/testinomail.png"
import StarIcon from "@mui/icons-material/Star";
const ClientFeedback = () => {
  return (
    <div className="client-feedback-container">
      <div className="client-feedback-left">
        <div className="client-feedback-image">
          <img src={testinomialImage} alt="Client" />
        </div>
      </div>
      <div className="client-feedback-right">
        <h2 className="client-feedback-heading">What Our Clients Are Saying</h2>
        <div className="client-feedback-content">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
            voluptatem reprehenderit placeat ducimus excepturi rem animi
            voluptatibus. Beatae necessitatibus consectetur et eos. Consectetur!
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem doloremque velit, neque amet ad unde corporis
            quibusdam recusandae numquam? Nostrum provident ipsa quaerat.
          </p>
        </div>
        <div className="client-details">
          <div className="client-name">
            john Doe, Jane Smith, and Robert Brown
          </div>
          <div className="client-role">
            Full Stack Developer, Project Manager, and UX Designer
          </div>
          <div className="client-rating">
            <StarIcon className='star'/>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientFeedback;
