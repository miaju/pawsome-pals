import { useState, React } from "react";
import "./styling/Delete.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Collapse from "react-bootstrap/Collapse";

export default function Delete(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="delete-container">
        {/* {props.id} */}
        {!open &&
        <FontAwesomeIcon
        id="trash-icon"
        icon={faTrash}
        onClick={() => setOpen(!open)}
        aria-controls="confirm-delete"
        aria-expanded={open}
        />
      }

        <Collapse in={open}>
          <div id="confirm-delete">
           <span id="pop-up-message">Delete {props.name}'s pawfile? </span><br />
            <button
              id="delete-btn-yes"
              className="button-option"
              onClick={() => {
                setOpen(false);
                props.delete(props.id);
              }}
            >
              <span className="delete-choice-text">Delete</span>
            </button>
            <button id="delete-btn-no" className="button-option" onClick={() => setOpen(false)}>
            <span className="delete-choice-text">Keep</span>
            </button>
          </div>
        </Collapse>
        {/* {!open && <span className="pet-delete-selection">Delete {props.name}'s Pawfile</span>} */}
      </div>
    </>
  );
}
