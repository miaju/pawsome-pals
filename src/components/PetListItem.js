import React from "react"
import { Link } from "react-router-dom";
import "./styling/PetListItem.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function PetListItem(props) {
  const isSelected = props.id === props.current.id;

  return (
    <div className="pet-card">
      <Link to={`/pets/${props.id}`} state={{data: props}} >
      <div className="pet-image">
      {isSelected && <img id="selected-img" title="see details" src={props.photo_url} alt={props.name} />}
      {!isSelected && <img id="unselected-img" title="see details" src={props.photo_url} alt={props.name} />}
      </div>
      </Link>
      <div className="pet-info">
      <FontAwesomeIcon className="delete-pet" icon={faTrash} size="s" />
        <p className="name">{props.name}</p>
        {isSelected && <p className="selected">{props.name} is currently selected for matchmaking!</p>}
        {/* {!isSelected && <p className="unselected">Go to <Link to={'/matches'} className="link-to-matches">Matches</Link> to find a playdate for {props.name}!</p>} */}
      </div>
      {/* <div className="select-pet">
        <button onClick={() => props.setcurrentpet(props.id)}>
          Go on a playdate with me!
        </button>
      </div> */}
    </div>

  )
}
