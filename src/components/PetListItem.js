import React from "react"
import { Link } from "react-router-dom";
import "./styling/PetListItem.scss"

export default function PetListItem(props) {
  console.log('PETLISTITEM', props)
  return (
    <div className="pet-card">
      <Link to={`/pets/${props.id}`} state={{data: props}} >
      <div className="pet-image">
        <img className="image" src={props.photo_url} alt={props.name} />
      </div>
      </Link>
      <div className="pet-info">
        <p className="bg-light border">{props.name}</p>
      </div>
      <div className="select-pet">
        <button onClick={() => props.setcurrentpet(props.id)}>
          Go on a playdate with me!
        </button>
      </div>
    </div>
  )
}
