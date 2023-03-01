import React from "react"
import "./styling/MatchItem.scss"
import { useLocation } from "react-router-dom";

export default function MatchDetail(props) {

  const location = useLocation();

  return (
    <section class="match-card">
      <div class="left">
        <img class="image" src={location.state.data.photo_url} />
      </div>
      <div class="right">
        <div class="match-name">{location.state.data.name}</div>
        <div class="match-info">
          Breed: {location.state.data.breed}<br/>
          Age: {location.state.data.age}<br/>
          Sex: {location.state.data.sex}<br/>
          Size: {location.state.data.size}<br/>
          City: {location.state.data.city}<br/>
          Description: {location.state.data.description}
        </div>
      </div>
    </section>
  )
}
