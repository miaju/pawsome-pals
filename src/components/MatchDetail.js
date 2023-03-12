import React, {useState} from "react"
import "./styling/MatchItem.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHeartCrack, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons'
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
    setLoading(true);
    props.addMatch({target: {id: location.state.data.id}, currentPet: {id: props.currentId}, dir: 'right'}).then((res) => {
      setTimeout(() => {
        navigate("/matches");
        window.location.reload();
      }, 500)
    })
  }

  let email = props.getUserByPet(location.state.data.id).then(e => {
    email = e.data.email;
  });

  return (
    <><UnMatchPopup setShow={setShow} show={show} unMatch={unMatch} loading={loading} />
    <div style={{ display: "grid" }}>
      <section className="match-card">
        <div className="right">
          <img className="image" src={location.state.data.photo_url} alt={props.name} />
        </div>
        <div className="left">
          <div className="match-name">{location.state.data.name}<hr/></div>
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
              Match <FontAwesomeIcon icon={faHeart} />
            </button>)}
            <button
              onClick={() => setShow(true)}>
              {notif ? "Delete" : "Unmatch"} <FontAwesomeIcon icon={faHeartCrack} />
            </button>
            <button
              onClick={() => window.location.href = `mailto:${email}`}>
              Message <FontAwesomeIcon icon={faEnvelope} />
            </button>
          </div>
        </div>
      </section>
      <div>
        <button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
      </div>
    </div></>
  )
}
