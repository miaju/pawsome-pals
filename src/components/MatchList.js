import React from "react";
import "./styling/MatchListItem.scss"
import MatchListItem from "./MatchListItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons'

export default function MatchList(props) {

  return (
    <section className="matches-container">
      {props.matches.length > 0 &&
        props.matches.map(match => (
          <MatchListItem
            key={match.id}
            id={match.id}
            name={match.name}
            breed={match.breed}
            age={match.age}
            sex={match.sex}
            size={match.size}
            spayed_or_neutered={match.spayed_or_neutered}
            city={match.city}
            description={match.description}
            photo_url={match.photo_url}
          />
        )
        )
      }
      {props.matches.length === 0 &&
        <div className="empty-card">
          <h2 className="message">No existing match found for the current pet <FontAwesomeIcon icon={faFaceSadTear} /></h2>
        </div>
      }
    </section>
  )
}
