import React from "react";
import PetListItem from "./PetListItem";
import "./styling/PetListItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldDog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PetList(props) {
  return (
    <>
      {props.pets.length === 1 ? (
        <h1 className="title">
          {" "}
          <b>Paw</b>file
        </h1>
      ) : (
        <h1 className="title">
          <b>Paw</b>files
        </h1>
      )}
      <span id="fact">
        A dog’s paw print is unique, much like a person’s fingerprint.
      </span>

      <div className="add-pet-container">
      <div id="add-pet">
        <Link to={"/pets/new"}>
          <FontAwesomeIcon className="add-pet" icon={faShieldDog} size="2x" />
          <FontAwesomeIcon className="add-pet" icon={faPlus} size="sm" />
        </Link>
      </div>
      </div>
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
      <span id="separator"></span>
    </>
  );
}
