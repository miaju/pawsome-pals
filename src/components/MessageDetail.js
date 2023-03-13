import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import "./styling/MessageDetail.scss";

export default function MessageDetail(props) {
  const location = useLocation();
  const [privateMsgs, setPrivateMsgs] = useState([]);

  const { setShowFooter } = props;

  useEffect(() => {
    if (location.state.data.from_petId && location.state.data.to_petId) {
      axios.get(`http://localhost:8080/api/messages/chat/${location.state.data.from_petId}/${location.state.data.to_petId}`)
        .then((response) => {
          const data = Object.entries(response.data).map(([key, value]) => ({ ...value }))
          console.log(data.length);
          setPrivateMsgs(data);
          setShowFooter(false);
        })
    }
  }, [location.state.data.from_petId, location.state.data.to_petId])
  console.log('chat', privateMsgs)

  return (
    <div className="chatScreen">
      {privateMsgs.map((message) => (
        location.state.data.currentpet !== message.from_petid ? (
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
        <input className="chatScreen_inputField" placeholder="Type a message..." type="text" />
        <button className="chatScreen_inputButton">SEND</button>
      </form>
    </div>
  )
}
