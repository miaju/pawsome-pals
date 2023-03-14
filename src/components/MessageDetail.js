import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import "./styling/MessageDetail.scss";

export default function MessageDetail(props) {
  const location = useLocation();
  const [privateMsgs, setPrivateMsgs] = useState([]);
  const [input, setInput] = useState('');

  const { setShowFooter } = props;

  useEffect(() => {
    if (location.state.data.current_petId && location.state.data.other_petId) {
      axios.get(`http://localhost:8080/api/messages/chat/${location.state.data.current_petId}/${location.state.data.other_petId}`)
        .then((response) => {
          // console.log('RESPONSE', response)
          // const data = Object.entries(response.data).map(([key, value]) => ({ ...value }))
          // console.log(data.length);
          setPrivateMsgs(response.data);
          setShowFooter(false);
        })
    }
  }, [location.state.data.current_petId, location.state.data.other_petId])

  const handleSend = (e) => {
    e.preventDefault();

    const newMsg = {
      from_pet_name: location.state.data.current_pet_name,
      from_pet_photo_url: location.state.data.current_pet_photo_url,
      from_petId: location.state.data.current_petId,
      to_pet_name: location.state.data.other_pet_name,
      to_petId: location.state.data.other_petId,
      to_pet_photo_url: location.state.data.other_pet_photo_url,
      message: input,
      timestamp: new Date().toISOString()
    };

    props.newMsg(newMsg);
    console.log('newmsg', newMsg)
    console.log('privatemessages', privateMsgs)
    setPrivateMsgs([...privateMsgs, newMsg]);
    setInput("");
  };

  return (
    <div className="chatScreen">
      {privateMsgs.map((message) => (
        location.state.data.current_petId !== (message.from_petid || message.from_petId) ? (
          <div key = {message.id} className="chatScreen_message">
            <Avatar
              className="chatScreen_image"
              alt={message.from_pet_name}
              src={message.from_pet_photo_url}
            />
            <p className="chatScreen_text">{message.message}</p>
          </div>
        ) :
          (
            <div key = {message.id} className="chatScreen_message">
              <p className="chatScreen_textUser">{message.message}</p>
              <Avatar
                className="chatScreen_image"
                alt={message.from_pet_name}
                src={message.from_pet_photo_url}
              />
            </div>
          )
      ))}

      <form className="chatScreen_input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="chatScreen_inputField"
          placeholder="Type a message..."
          type="text"
        />
        <button onClick={handleSend} type="submit" className="chatScreen_inputButton">SEND</button>
      </form>
    </div>
  )
}
