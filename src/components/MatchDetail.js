import React from "react"
import "./styling/MatchItem.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function MatchDetail(props) {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <section className="match-card">
        <div className="left">
          <img className="image" src={location.state.data.photo_url} alt={props.name}/>
        </div>
        <div className="right">
          <div className="match-name">{location.state.data.name}</div>
          <div className="match-info">
            Breed: {location.state.data.breed}<br />
            Age: {location.state.data.age}<br />
            Sex: {location.state.data.sex}<br />
            Size: {location.state.data.size}<br />
            City: {location.state.data.city}<br />
            Description: {location.state.data.description}
          </div>
        </div>
      </section>
      <div>
        <button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
      </div>
    </>
  )
}
