import React from "react";
import "./styling/MessageListItem.scss";

export default function MessageListItem(props) {
  console.log('Message list item PROPS', props)
  return (
    <div className="chat">
      <img className="chat-image" src={props.from_pet_url} alt={props.from_pet_name}/>
      <div className="chat-details">
        <h2>{props.from_pet_name}</h2>
        <p>{props.message}</p>
      </div>
      <p className="chat-timestamp">{props.timestamp}</p>
    </div>
  );
}
