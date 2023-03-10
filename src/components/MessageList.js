import React from "react";
import MessageListItem from "./MessageListItem";

export default function MessageList(props) {
  console.log(props)
  return (
    <section className="messages-container">
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
        />
      ))}
    </section>
  )
}
