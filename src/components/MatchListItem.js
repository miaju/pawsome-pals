import React, {useState} from "react"
import { Link } from "react-router-dom";
import "./styling/MatchListItem.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from "react-bootstrap";
import UnMatchPopup from "./UnMatchPopup";

export default function MatchListItem(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const unMatch = () => {
    setLoading(true)
    props.unMatch(props.currentPet.id, props.id);
  }

  function toMatch() {
    const newMsg = {
      from_petId: props.currentPet.id,
      to_petId: props.id,
      message: "You matched with each other!",
      timestamp: new Date().toISOString()
    };
    props.newMsg(newMsg);
    console.log(newMsg);

    setLoading(true);
    props.addMatch({target: props, currentPet: props.currentPet, dir: 'right'}).then((res) => {
      setTimeout(() => {
        window.location.reload();
      }, 500)
    })
  }

  const data = {
    id: props.id,
    name: props.name,
    breed: props.breed,
    age: props.age,
    sex: props.sex,
    size: props.size,
    city: props.city,
    description: props.description,
    photo_url: props.photo_url,
    type: props.type
  }

  return (
    <>
    <UnMatchPopup setShow={setShow} show={show} unMatch={unMatch} loading={loading}/>
    <div className="pet-card">
      <Link to={`/matches/${props.id}`} state={{ data: data}}>
        <div className="pet-image">
          <img className="image" src={props.photo_url} alt={props.name} />
        </div>
      </Link>
      <div className="pet-info">
        {(props.type !== 'notifications') ?
        (<div
          onClick={() => setShow(true)}
          className="like-button"
          title="Like Button"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover ? <FontAwesomeIcon icon={faHeartCrack} />  : <FontAwesomeIcon icon={faHeart} />}
        </div>) :
        (<div onClick={toMatch}
          className="not-liked"
          title="Like Button"
          >
          {loading ? <Spinner size="sm"/> : <FontAwesomeIcon icon={faHeart} />}
        </div>)
        }
        <p className="bg-light border">{props.name}</p>
      </div>
    </div>
    </>
  )
}
