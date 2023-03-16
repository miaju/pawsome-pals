import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
          <div className="match-profile">
            <img src={props.otherPet.photo_url} alt={props.otherPet.name} />
            <h3>{props.otherPet.name}</h3>
          </div>
        </div>
        <div className="buttons">
          <Button onClick={() => props.setShowPopup(false)} className="button continue-button">Continue Swiping</Button>
          <Button onClick={() => {window.location = "/matches"}} className="button matches-button">Go to matches</Button>
        </div>
      </div>
    </Modal>
  );
}

export default Popup;
