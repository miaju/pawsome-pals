import React from "react";
import PetListItem from "./PetListItem";

export default function PetList(props) {

  return(
    <section className="pets">
      <h4>Pets</h4>
      <ul>
        {props.pets.length > 0 &&
          props.pets.map((pet) => (
              <PetListItem
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              age={pet.age}
              sex={pet.sex}
              size={pet.size}
              spayed_or_neutered={pet.spayed_or_neutered}
              city={pet.city}
              description={pet.description}
              photo_url={pet.photo_url}
              />
            )
          )
        }
      </ul>
    </section>
  )
}
