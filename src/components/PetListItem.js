import { useState, React } from "react";
import { Link } from "react-router-dom";
import "./styling/PetListItem.scss";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function PetListItem(props) {
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const isSelected = props.id === props.current.id;

  function confirmDelete() {
    setConfirm(true);
  }

  return (
    <div className="pet-card">
      <Link to={`/pets/${props.id}`} state={{ data: props }}>
        <div className="pet-image">
          {isSelected && (
            <img
              id="selected-img"
              title="see details"
              src={props.photo_url}
              alt={props.name}
            />
          )}
          {!isSelected && (
            <img
              id="unselected-img"
              title="see details"
              src={props.photo_url}
              alt={props.name}
            />
          )}
        </div>
      </Link>
      <div className="pet-info">
        <FontAwesomeIcon
          className="delete-pet"
          icon={faTrash}
          onClick={() => setOpen(!open)}
          aria-controls="confirm-delete"
          aria-expanded={open}
        />
        <Collapse in={open}>
          <div id="confirm-delete">
            Are you sure you want to delete {props.name}'s pawfile?'
          </div>
        </Collapse>
        {!open && <p className="name">{props.name}</p>}
        {isSelected && !open && (
          <p className="selected">
            {props.name} is currently selected for matchmaking!
          </p>
        )}
        {/* {!isSelected && <p className="unselected">Go to <Link to={'/matches'} className="link-to-matches">Matches</Link> to find a playdate for {props.name}!</p>} */}
      </div>
    </div>
  );
}

{
  /* <div className="select-pet">
  <button onClick={() => props.setcurrentpet(props.id)}>
    Go on a playdate with me!
  </button>
</div> */
}
