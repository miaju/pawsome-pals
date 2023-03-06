import React from "react";
import "./styling/Footer.scss";
import pawprint from "./styling/pawprint.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="dog-icon">
        <FontAwesomeIcon icon={faDog} bounce transform={{ rotate: 5 }} />
        <FontAwesomeIcon icon={faDog} size="xl" /> <br />
      </div>

      <footer>
        All's well that friends well
        <img src={pawprint} id="pawprint" alt="pawprint-icon" />
      </footer>
    </div>
  );
}
