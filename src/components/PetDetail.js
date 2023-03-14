import React from "react";
import "./styling/PetItem.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function PetDetail(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const playdateButton = (pet) => {
    props.handlePetChange(pet);
    setTimeout(() => {
      navigate("/explore");
    }, 500)
  }

  return (
    <div style={{display: "grid", height: "90vh"}}>
      <section id="pet-card">
        <div className="left">
          <img className="image" src={location.state.data.photo_url} alt={props.name} />
        </div>
        <div className="right">
          <div className="pet-name">{location.state.data.name}</div>
          <div className="pet-info">
            <b> Breed: </b> {location.state.data.breed}<br />
            <b> Age: </b> {location.state.data.age}<br />
            <b> Sex: </b> {location.state.data.sex}<br />
            <b> Size: </b> {location.state.data.size}<br />
            <b> City: </b> {location.state.data.city}<br />
            <b> Description: </b> {location.state.data.description}
          </div>
        </div>
      </section>
      <div className="select-pet">
        <button onClick={() => playdateButton(location.state.data)}>
          Go on a playdate with me!
        </button>
      </div>
      <div className="previous-page">
        <button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
      </div>
    </div>
  )
}
