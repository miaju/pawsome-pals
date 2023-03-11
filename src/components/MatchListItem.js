import React, {useState} from "react"
import { Link } from "react-router-dom";
import "./styling/MatchListItem.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import UnMatchPopup from "./UnMatchPopup";

export default function MatchListItem(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const unMatch = () => {
    setLoading(true)
    props.unMatch(props.currentPet.id, props.id);
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
        {(props.type !== 'matchee') && <div onClick={() => setShow(true)} className="like-button" title="Like Button">
          <FontAwesomeIcon icon={faHeart} />
        </div>}
        <p className="bg-light border">{props.name}</p>
      </div>
    </div>
    </>
  )
}
