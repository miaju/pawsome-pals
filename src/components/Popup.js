import React from "react";
import { Link } from "react-router-dom";

import "./styling/Popup.scss";

function Popup(props) {
  console.log('currentpet', props.petName)
  console.log('otherpet', props.otherPetName)

  return (
    <div className="match-page">
       <h1>It's a match!</h1>
       <div className="match-profiles">
        <div className="match-profile">
          <img src={props.petName.photo_url} alt={props.petName.name} />
          <h3>{props.petName.name}</h3>
        </div>
        <div className="match-profile">
          <img src={props.otherPetName.photo_url} alt={props.otherPetName.name} />
          <h3>{props.otherPetName.name}</h3>
        </div>
      </div>
       <Link to="/explore">
        <button className="continue-button">Continue Swiping</button>
       </Link>
    </div>
  );
}

export default Popup;
