import React, { useEffect } from "react";
import { useState } from "react";
import "./styling/MatchListItem.scss"
import "./styling/MatchList.scss"
import MatchListItem from "./MatchListItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons'
import Nav from "react-bootstrap/Nav";

export default function MatchList(props) {
  let [empty, setEmpty] = useState(false);
  let [content, setContent] = useState({matches: props.matches, title: 'Matches'});

  useEffect(() => {
    setTimeout(() => {
      setEmpty(true)
    },500)
  }, [])


  return (
    (props.matches && props.pending && props.matchee) ? (
      <>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => setContent({matches: props.matches, title: 'Matches'})}>Matches</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setContent({matches: props.pending, title: 'Pending'})}>Pending</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setContent({matches: props.matchee, title: 'Matched with'})} >
            Matchee
          </Nav.Link>
        </Nav.Item>
      </Nav><section className="matches-container">
          {content.matches.length ? <h1>{content.title}</h1> : <></>}
          {(content.matches.length) ? (
            content.matches.map(match => (
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
                current={props.current} />
            )
            )
          ) : (<></>)}
          {(empty && !content.matches.length) &&
            <div className="empty-card">
              <h2 className="message">No existing {content.title.toLowerCase()} found for the current pet <FontAwesomeIcon icon={faFaceSadTear} /></h2>
            </div>}
        </section>
        </>
    ) : (<></>)
  );
}
