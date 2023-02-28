import React from "react"
import "./styling/PetListItem.scss"

export default function PetListItem(props) {
  return (
    <div className="pet-card">
      <div className="pet-image">
        <img className="image" src={props.photo_url} alt={props.name} />
      </div>
      <div className="pet-info">
        <p className="bg-light border">{props.name}</p>
      </div>
    </div>
  )
}
