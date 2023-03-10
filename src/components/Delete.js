import { useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Collapse from "react-bootstrap/Collapse";

export default function Delete(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {props.id} {props.name}
      <FontAwesomeIcon
        id="trash-icon"
        icon={faTrash}
        onClick={() => setOpen(!open)}
        aria-controls="confirm-delete"
        aria-expanded={open}
      />
      Delete a profile
      <Collapse in={open}>
        <div id="confirm-delete">
          Are you sure you want to delete {props.name}'s pawfile? <br />
          <button
            onClick={() => {
              setOpen(false);
              props.delete(props.id)
            }}
          >
            Yes
          </button>
          <button onClick={() => setOpen(false)}>No</button>
        </div>
      </Collapse>
    </>
  );
}
