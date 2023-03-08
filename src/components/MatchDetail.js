import React from "react"
import "./styling/MatchItem.scss"
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHeartCrack, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function MatchDetail(props) {

  const location = useLocation();
  const navigate = useNavigate();

  console.log(props.current, location.state.data.id);
  return (
    <div style={{height: "80vh"}}>
      <section class="match-card">
        <div class="right">
          <img class="image" src={location.state.data.photo_url} alt={props.name} />
        </div>
        <div class="left">
          <div class="match-name">{location.state.data.name}</div>
          <div class="match-info">
            Breed: {location.state.data.breed}<br />
            Age: {location.state.data.age}<br />
            Sex: {location.state.data.sex}<br />
            Size: {location.state.data.size}<br />
            City: {location.state.data.city}<br />
            Description: {location.state.data.description}
          </div>
          <div class="match-buttons">
            <button class="btn-white" onClick={() => {props.unmatch(props.currentId, location.state.data.id)}} >Unmatch <FontAwesomeIcon icon={faHeartCrack} /></button>
            <button component={Link} to="/messages">Message <FontAwesomeIcon icon={faEnvelope} /></button>
          </div>
        </div>
      </section>
      <div>
        <button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
      </div>
    </div>
  )
}
