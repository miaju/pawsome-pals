import React from "react"
import { Link } from "react-router-dom";
import "./styling/PetListItem.scss"

export default function PetListItem(props) {
  const isSelected = props.id === props.current.id;

  return (
    <div className="pet-card">
      <Link to={`/pets/${props.id}`} state={{data: props}} >
      <div className="pet-image">
        <img className="image" src={props.photo_url} alt={props.name} />
      </div>
      </Link>
      <div className="pet-info">
        <p className="bg-light border">{props.name}</p>
        {isSelected && <p>Selected!</p>}
      </div>
      {/* <div className="select-pet">
        <button onClick={() => props.setcurrentpet(props.id)}>
          Go on a playdate with me!
        </button>
      </div> */}
    </div>
  )
}
