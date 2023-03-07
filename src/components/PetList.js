import React from "react";
import PetListItem from "./PetListItem";
import "./styling/PetListItem.scss"

export default function PetList(props) {

  return (
    <section className="pets-container">
      {props.pets.length > 0 &&
        props.pets.map(pet => (
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
        )
        )
      }
    </section>
  )
}
