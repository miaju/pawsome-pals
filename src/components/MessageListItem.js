import React from "react";
import { Link } from "react-router-dom";
import "./styling/MessageListItem.scss";
import TimeAgo from 'timeago-react';

export default function MessageListItem(props) {

  const petData = {
    current_pet_name: props.currentpet === props.to_petId ? props.to_pet_name : props.from_pet_name,
    current_pet_photo_url: props.currentpet === props.to_petId ? props.to_pet_url : props.from_pet_url,
    current_petId: props.currentpet === props.to_petId ? props.to_petId : props.from_petId,
    other_pet_name: props.currentpet === props.to_petId ? props.from_pet_name : props.to_pet_name,
    other_pet_photo_url: props.currentpet === props.to_petId ? props.from_pet_url : props.to_pet_url,
    other_petId: props.currentpet === props.to_petId ? props.from_petId : props.to_petId
  }

  return (
    <Link className="link" to={`/messages/${props.id}`} state={{ data: petData }} >
      <div className="chat">
        {props.currentpet === props.from_petId ? <img className="chat-image" src={props.to_pet_url} alt={props.to_pet_name} /> : <img className="chat-image" src={props.from_pet_url} alt={props.from_pet_name} />}
        <div className="chat-details">
          {props.currentpet === props.from_petId ? <h2>{props.to_pet_name}</h2> : <h2>{props.from_pet_name}</h2>}
          <p>{props.message}</p>
        </div>
        <TimeAgo className="chat-timestamp"
          datetime={props.timestamp}
          locale="en-US"
        />
      </div>
    </Link>
  );
}
