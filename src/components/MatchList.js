import React, { useEffect } from "react";
import { useState } from "react";
import "./styling/MatchListItem.scss"
import "./styling/MatchList.scss";
import "./styling/petDropdown.scss";
import MatchListItem from "./MatchListItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons'
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";

export default function MatchList(props) {
  let [empty, setEmpty] = useState(false);


  const pending = {
    matches: props.pending,
    title: 'Pending',
    description: "This is where the matches you have made that haven't been responded to yet."
  }

  const matches = {
    matches: props.matches,
    title: "Matches",
    description: "These are your pet's full matches."
  }

  const matchee = {
    matches: props.matchee,
    title: 'Notifications',
    description: "This are the matches where the other pet matches with your pet."
  }


  let [content, setContent] = useState(matches);
  console.log(content);
  useEffect(() => {
    setTimeout(() => {
      setEmpty(true);
    },500)
  }, [])


  return (
    (props.matches && props.pending && props.matchee) ? (
      <>
      <Dropdown id="petDropdown">
        <span>{props.currentPet.name ? `Viewing matches for ${props.currentPet.name}` : 'Select pet'}</span>
        <Dropdown.Toggle id="dropdown-basic">
          Pets
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {props.userPets.map((pet) => {
            return <Dropdown.Item key={pet.id} onClick={() => props.setCurrentPet(pet)}>{pet.name}</Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link onClick={() => setContent(matches)}>Matches</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setContent(pending)}>Pending</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setContent(matchee)} >
            Notifications
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <section className="matches-container">
            <>
            <p id="des">{content.description}</p>
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
            ) : (<></>)}</>
            {(empty && !content.matches.length) &&
              <div className="empty-card">
                <h2 className="message">No existing {content.title.toLowerCase()} found for the current pet <FontAwesomeIcon icon={faFaceSadTear} /></h2>
              </div>}
          </section></>
    ) : (<></>)
  );
}
