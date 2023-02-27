import React from "react"

export default function PetListItem(props) {
  return(
    <div>
      <img src={props.photo_url}/>
      <p>Name: {props.name}</p>
      <p>Breed: {props.breed}</p>
      <p>Age: {props.age}</p>
      <p>Sex: {props.sex}</p>
      <p>Size: {props.size}</p>
      <p>Spayed or neutered: {props.spayed_or_neutered}</p>
      <p>City: {props.city}</p>
      <p>Description: {props.description}</p>
    </div>
  )
}
