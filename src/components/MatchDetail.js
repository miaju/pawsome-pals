import React, {useState} from "react"
import "./styling/MatchItem.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHeartCrack, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import UnMatchPopup from "./UnMatchPopup";

export default function MatchDetail(props) {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const unMatch = () => {
    setLoading(true)
    props.unmatch(props.currentId, location.state.data.id);
  }

  const location = useLocation();
  const navigate = useNavigate();
  console.log(props)
  console.log(location);

  let email = props.getUserByPet(location.state.data.id).then(e => {
    email = e.data.email;
  });

  return (
    <><UnMatchPopup setShow={setShow} show={show} unMatch={unMatch} loading={loading} />
    <div style={{ height: "80vh" }}>
      <section className="match-card">
        <div className="right">
          <img className="image" src={location.state.data.photo_url} alt={props.name} />
        </div>
        <div className="left">
          <div className="match-name">{location.state.data.name}</div>
          <div className="match-info">
            Breed: {location.state.data.breed}<br />
            Age: {location.state.data.age}<br />
            Sex: {location.state.data.sex}<br />
            Size: {location.state.data.size}<br />
            City: {location.state.data.city}<br />
            Description: {location.state.data.description}
          </div>
          <div className="match-buttons">
            <button
              onClick={() => setShow(true)}>
              Unmatch <FontAwesomeIcon icon={faHeartCrack} />
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
