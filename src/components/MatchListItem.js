import React from "react"
import "./styling/MatchListItem.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function MatchListItem(props) {
  return (
    <div className="pet-card">
      <div className="pet-image">
        <img className="image" src={props.photo_url} alt={props.name} />
        <div href="#" class="like-button" title="Like Button">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
      <div className="pet-info">
        <p className="bg-light border">{props.name}</p>
      </div>
    </div>
  )
}
