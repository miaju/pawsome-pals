import React, {useState} from "react";
import MessageListItem from "./MessageListItem";
import { Dropdown, Button, Modal, Spinner } from "react-bootstrap";


export default function MessageList(props) {
  const [show, setShow] = useState(false);

  return (
    <section className="messages-container">
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
    <Button onClick={() => setShow(true)}>Click</Button>
    <Dropdown id="new-message-list">
      <span>Pick a pet that has interacted with {props.currentPet.name} to message</span>
      <Dropdown.Toggle id="dropdown-basic">
        Pets
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {((props.matches.concat(props.matchee)).concat(props.pending)).map((pet) => {
          return <Dropdown.Item key={pet.id} onClick={() => props.newChat(pet)}>{pet.name}</Dropdown.Item>
        })}
      </Dropdown.Menu>
    </Dropdown>
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
