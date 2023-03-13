import React from "react";
import { Link } from "react-router-dom";
import "./styling/MessageListItem.scss";

export default function MessageListItem(props) {
  console.log('Message list item PROPS', props)
  return (
    <Link className="link" to={`/messages/${props.id}`} state={{ data: props }} >
      <div className="chat">
        {props.currentpet === props.from_petId ?  <img className="chat-image" src={props.to_pet_url} alt={props.to_pet_name} /> : <img className="chat-image" src={props.from_pet_url} alt={props.from_pet_name} />}
        <div className="chat-details">
        {props.currentpet === props.from_petId ? <h2>{props.to_pet_name}</h2> : <h2>{props.from_pet_name}</h2>}
          <p>{props.message}</p>
        </div>
        <p className="chat-timestamp">{props.timestamp}</p>
      </div>
    </Link>
  );
}
