import React from "react";
import { Modal } from "react-bootstrap";

import "./styling/Popup.scss";

function Popup(props) {
  return (
    <Modal
      size="lg"
      centered
      show={props.showPopup}
      onHide={() => props.setShowPopup(false)}
    >
      <div className="match-page">
        <h1>It's a match!</h1>
        <div className="match-profiles">
          <div className="match-profile">
            <img src={props.pet.photo_url} alt={props.pet.name} />
            <h3>{props.pet.name}</h3>
          </div>
          <div className="match-profile">
            <img src={props.otherPet.photo_url} alt={props.otherPet.name} />
            <h3>{props.otherPet.name}</h3>
          </div>
        </div>
          <button onClick={() => props.setShowPopup(false)} className="continue-button">Continue Swiping</button>
      </div>
    </Modal>
  );
}

export default Popup;
