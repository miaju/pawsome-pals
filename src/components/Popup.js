import React from "react";
import { Link } from "react-router-dom";

import "./styling/Popup.scss";

function Popup(props) {
  console.log(props)
  return (
    <div className="match-page">
       <h1>It's a match!</h1>
       <Link to="/">
        <button className="continue-button">Continue Swiping</button>
       </Link>
    </div>
  );
}

export default Popup;
