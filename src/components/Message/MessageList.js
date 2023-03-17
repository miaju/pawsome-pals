import React, {useState} from "react";
import { Dropdown, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import MessageListItem from "./MessageListItem";
import "./MessageList.scss";


export default function MessageList(props) {
  const [show, setShow] = useState(false);
  const potentialPets = (props.matches.concat(props.matchee)).concat(props.pending)

  return (
    <section className="messages-container">
    <div className="top">
      <Dropdown id="petDropdown">
        <span>{props.currentPet?.name ? `Viewing messages for ` : 'Select pet to view messages for '}</span>
        <Dropdown.Toggle id="dropdown-basic">
          {props.currentPet?.name || "Pets"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {props.userPets.map((pet) => {
            return <Dropdown.Item key={pet.id} onClick={() => props.setCurrentPet(pet)}>{pet.name}</Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>
      {(props.currentPet?.name && !show) && <FontAwesomeIcon icon={faPlus} onClick={() => setShow(true)}></FontAwesomeIcon>}
      <Dropdown style={show ? {display: "block"} : {display: "none"}} id="new-message-list">
        <span>Pick a pet that has interacted with {props.currentPet.name} to message </span>
        <Dropdown.Toggle id="dropdown-basic">
          Pets
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {(potentialPets).map((pet) => {
            return <Dropdown.Item key={pet.id} onClick={() => props.newChat({currentPet: props.currentPet, pet})}>{pet.name}</Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
      {
      props.messages.map(message => (
        <MessageListItem
          key={message.id}
          id={message.id}
          from_petId={message.from_petid}
          to_petId={message.to_petid}
          message={message.message}
          timestamp={message.timestamp}
          from_pet_name={message.from_pet_name}
          to_pet_name={message.to_pet_name}
          from_pet_url={message.from_pet_photo_url}
          to_pet_url={message.to_pet_photo_url}
          currentpet={props.currentId}
        />
      ))}
    </section>
  )
}
