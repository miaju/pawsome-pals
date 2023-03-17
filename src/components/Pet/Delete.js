import React, { useState } from "react";
import "./Delete.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeletePetPopup from "./DeletePetPopup";

export default function Delete(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const deletePet = () => {
    setLoading(true);
    props.delete(props.id);
    console.log("deletePet called in Delete.js");
  };

  return (
    <>
      <DeletePetPopup
        name={props.name}
        setShow={setShow}
        show={show}
        deletePet={deletePet}
        loading={loading}
      />
      <div className="delete-container">
        <FontAwesomeIcon
          id="trash-icon"
          icon={faTrash}
          onClick={() => setShow(true)}
        />
      </div>
    </>
  );
}
