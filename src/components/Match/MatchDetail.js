import React, { useState } from "react"
import "./MatchItem.scss"
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHeartCrack, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from "react-bootstrap";
import UnMatchPopup from "./UnMatchPopup";

export default function MatchDetail(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const notif = (location.state.data.type === 'notifications');

  const unMatch = () => {
    setLoading(true)
    props.unmatch(props.currentId, location.state.data.id);
  }

  function toMatch() {
    const newMsg = {
      from_petId: props.currentId,
      to_petId: location.state.data.id,
      message: "You matched with each other!",
      timestamp: (new Date().toLocaleString("en-US"))
    };
    props.newMsg(newMsg);
    console.log(newMsg);

    setLoading(true);
    props.addMatch({ target: { id: location.state.data.id }, currentPet: { id: props.currentId }, dir: 'right' }).then((res) => {
      setTimeout(() => {
        navigate("/matches");
        window.location.reload();
      }, 500)
    })
  }

  // add this line in message button onclicK: window.location.href = `mailto:${email}`
  // use only if messaging does not work
  // let email = props.getUserByPet(location.state.data.id).then(e => {
  //   email = e.data.email;
  // });

  return (
    <><UnMatchPopup setShow={setShow} show={show} unMatch={unMatch} loading={loading} />
      <div style={{ display: "grid" }}>
        <section className="match-card">
          <div className="right">
            <img className="image" src={location.state.data.photo_url} alt={props.name} />
          </div>
          <div className="left">
            <div className="match-name">{location.state.data.name}<hr /></div>
            <div className="match-info">
              <b> Breed: </b> {location.state.data.breed}<br />
              <b> Age: </b> {location.state.data.age}<br />
              <b> Sex: </b> {location.state.data.sex}<br />
              <b> Size: </b> {location.state.data.size}<br />
              <b> City: </b> {location.state.data.city}<br />
              <b> Description: </b> {location.state.data.description}
            </div>
            <div className="match-buttons">
              {notif && (<button
                onClick={toMatch}>
                {loading ? <Spinner></Spinner> : <>Match <FontAwesomeIcon icon={faHeart} /></>}
              </button>)}
              <button
                onClick={() => setShow(true)}>
                {notif ? "Delete" : "Unmatch"} <FontAwesomeIcon icon={faHeartCrack} />
              </button>
                <button onClick={() => props.newChat({currentPet: props.currentPet, pet: location.state.data})}>
                  Message <FontAwesomeIcon icon={faEnvelope} />
                </button>
            </div>
          </div>
        </section>
        <div>
          <button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
        </div>
      </div>
    </>
  )
}
