import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function MessageDetail(props) {
  const location = useLocation();
  console.log('LOCATION>>>>>>>', location.state.data)
console.log('Message detail PROPS', props)


const [privateMsgs, setPrivateMsgs] = useState([]);

useEffect(() => {
  if (location.state.data.from_petId && location.state.data.to_petId) {
    axios.get(`http://localhost:8080/api/messages/chat/${location.state.data.from_petId}/${location.state.data.to_petId}`)
    .then((response) => {
      const data = Object.entries(response.data).map(([key, value]) => ({ ...value }))
      console.log(data.length);
      setPrivateMsgs(data);
  })}
}, [location.state.data.from_petId, location.state.data.to_petId])
console.log('chat', privateMsgs)
  return (
    <div className="privateMsgs">
      <div>
        <p>{props.message}</p>
      </div>
    </div>
  )
}
