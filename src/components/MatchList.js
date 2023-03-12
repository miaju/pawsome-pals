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
import { Badge} from "react-bootstrap";

export default function MatchList(props) {
  let [empty, setEmpty] = useState(false);

  const pending = {
    matches: props.pending,
    title: 'Pending',
    description: `These are the pets that ${props.currentPet.name} thinks are great! The other pet owner hasn't responed to these yet.`
  }

  const matches = {
    matches: props.matches,
    title: "Matches",
    description: `These are ${props.currentPet.name}'s full matches! Both you and the other owner agree they'll be great friends.`
  }

  const matchee = {
    matches: props.matchee,
    title: 'Notifications',
    description: `Whoa! These are all the pets that think ${props.currentPet.name} is great! Why don't take a look?`
  }
  let [content, setContent] = useState(matches);

  useEffect(() => {
    setTimeout(() => {
      setEmpty(true);
    },500)
  }, [])

  useEffect(() => {
    setContent(matches);
  }, [props.matches])

  return (
    (props.matches && props.pending && props.matchee) ? (
      <>
      <Nav variant="tabs">
        <div className="tab-names">
          <Nav.Item>
              <Nav.Link onClick={() => setContent(matches)} style={(content.title === 'Matches') ? {fontSize: "150%"}: {}}>Matches</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setContent(pending)} style={(content.title === 'Pending') ? {fontSize: "150%"}: {}}>Pending</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setContent(matchee)} style={(content.title === 'Notifications') ? {fontSize: "150%"}: {}}>
                Notifications {(matchee.matches.length > 0) && <Badge pill>{matchee.matches.length}</Badge>}
              </Nav.Link>
            </Nav.Item>
        </div>
        <Dropdown id="petDropdown">
          <span>{props.currentPet.name ? `Viewing matches for ` : 'Select pet '}</span>
          <Dropdown.Toggle id="dropdown-basic">
            {props.currentPet.name || "Pets"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {props.userPets.map((pet) => {
              return <Dropdown.Item key={pet.id} onClick={() => props.setCurrentPet(pet)}>{pet.name}</Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Nav>

      <section className="matches-container">
            <>
            <p id="des">{content.description}</p>
            {(content.matches.length) ? (
              content.matches.map(match => (
                <MatchListItem
                  key={match.id}
                  type={content.title.toLowerCase()}
                  unMatch={props.unMatch}
                  addMatch={props.addMatch}
                  getUserByPet={props.getUserByPet}
                  currentPet={props.currentPet}
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
                <h2 className="message">Sorry! No existing {content.title.toLowerCase()} found for the current pet. <FontAwesomeIcon icon={faFaceSadTear} /></h2>
              </div>}
          </section></>
    ) : (<></>)
  );
}
