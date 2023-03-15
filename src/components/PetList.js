import React, { useState } from "react";
import PetListItem from "./PetListItem";
import Delete from "./Delete";
import "./styling/PetListItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PetList(props) {
  const [show, setShow] = useState(false);

  function addPlus() {
    setShow(true);
    console.log(show);
  }

  function hidePlus() {
    setShow(false);
  }

  return (
    <>
      {props.pets.length === 1 ? (
        <h1 className="title">
          {" "}
          View your pet's <b>Paw</b>file!
        </h1>
      ) : (
        <h1 className="title">
          View your pet's <b>Paw</b>files!
        </h1>
      )}

      <div className="add-pet-container">
        Click me to add another pet! <br />
        <div id="add-pet-button">
          <Link to={"/pets/new"}>
            {!show && (
              <FontAwesomeIcon
                onMouseEnter={addPlus}
                onMouseLeave={hidePlus}
                className="add-pet-icons"
                icon={faDog}
                size="2x"
              />
            )}
            {show && (
              <FontAwesomeIcon
                onMouseEnter={addPlus}
                onMouseLeave={hidePlus}
                bounce
                className="add-pet-icons"
                icon={faDog}
                size="2x"
              />
            )}
          </Link>
        </div>
      </div>

      {props.pets.length >= 1 && (
        <span id="instructions">
          Click the pet's pawfile to view some more info!
        </span>
      )}

      {props.pets.length !== 0 && (
        <section className="pets-container">
          {props.pets.length > 0 &&
            props.pets.map((pet) => (
              <PetListItem
                key={pet.id}
                id={pet.id}
                name={pet.name}
                breed={pet.breed}
                age={pet.age}
                sex={pet.sex}
                size={pet.size}
                spayed_or_neutered={pet.spayed_or_neutered}
                city={pet.city}
                description={pet.description}
                photo_url={pet.photo_url}
                current={props.current}
              />
            ))}
        </section>
      )}

      {props.pets.length === 0 && (
        <section id="no-pets-view" className="pets-container">
          such empty
          <FontAwesomeIcon icon={faFaceSadTear} />
        </section>
      )}
      <div id="delete-buttons-container">
        {props.pets.length > 0 &&
          props.pets.map((pet) => (
            <Delete id={pet.id} name={pet.name} delete={props.deletePet} />
          ))}
      </div>
      {/* <span id="separator"></span> */}
    </>
  );
}
