import React from "react";
import "./styling/MessageListItem.scss";

export default function MessageListItem(props) {
  console.log('HELLLLLLLLLO', props)
  return (
    <div className="messages">
      <img src=""/>
      <div className="message-details">
        <h2>name</h2>
        <p>{props.message}</p>
      </div>
      <p className="message-timestamp">{props.timestamp}</p>
    </div>
  );
}
