import React from "react";

export default function MessageDetail(props) {
console.log('Message detail PROPS', props)
  return (
    <div className="chatScreen">
      <div>
        <p>{props.message}</p>
      </div>
    </div>
  )
}
