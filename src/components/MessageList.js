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
        />
      ))}
    </section>
  )
}
