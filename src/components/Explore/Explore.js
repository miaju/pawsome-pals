import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import "./Explore.scss";
import Popup from './Popup';
import shuffle from '../helpers/shuffleArray';

// a lot of the code for the tinder swiping effect comes from the react-tinder-card's web demo page
// code can be found at: https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js
function Advanced(props) {
  const [explorePets, setExplorePets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [lastDirection, setLastDirection] = useState();
  const [clicked, setClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

// make a new message if both pets matched with eachother
  const generateFirstMsg = (target, current) => {

    const newMsg = {
      from_petId: current,
      to_petId: target,
      message: "You matched with each other!",
      timestamp: (new Date().toLocaleString("en-US"))
    };

    props.newMsg(newMsg);
  };

// when currentIndex changes add a match if the swipe direction was right
  useEffect(() => {
    let target = explorePets[currentIndex + 1];
    let currentPet = props.currentPet;
    props.addMatch({ target: target, dir: lastDirection, currentPet: currentPet })
    .then(
      (matchResult)=> {
        if (matchResult && matchResult.pet_one_match && matchResult.pet_two_match) {
          setShowPopup(true);
          generateFirstMsg(target.id, currentPet.id);
        }
      }
    );
  }, [currentIndex]);

  const childRefs = useMemo(
    () =>
      Array(explorePets.length)
        .fill(0)
        .map((i) => React.createRef()),
    [explorePets.length]
  )

// when the current pet id changes get all the pets that the current pet hasn't interacted with before
  useEffect(() => {
    if (props.currentPet.id && props.userId) {
      axios.get(`http://localhost:8080/api/pets/explore/${props.currentPet.id}/${props.userId}`)
      .then((response) => {
        const data = Object.entries(response.data).map(([key, value]) => ({ ...value }))
        setExplorePets(shuffle(data).slice(0,15));
      });}
  }, [props.currentPet, props.userId])

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

// when the explore pets load in then set the current index as the last explore pet
  useEffect(() => {
    setCurrentIndex(explorePets.length - 1);
  }, [explorePets.length])

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, name, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const click = () => { setClicked(!clicked) }

  const outOfFrame = (name, idx) => {
    //console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < explorePets.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  return (
      <div className='matchlist'>
      {showPopup && <Popup setShowPopup={setShowPopup} pet={props.currentPet} otherPet={explorePets[currentIndex + 1]} showPopup={showPopup}/>}
        <div id="top">
          <h1>Let's look at some <b>Paw</b>tential matches!</h1>
          <Dropdown id="petDropdown">
            <span>{props.currentPet?.name ? `Finding match for ` : 'Select pet to search for '}</span>
            <Dropdown.Toggle id="dropdown-basic">
              {props.currentPet?.name || "Pets"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {props.userPets.map((pet) => {
                return <Dropdown.Item key={pet.id} onClick={() => props.setCurrentPet(pet)}>{pet.name}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {(!props.currentPet.id && props.userPets.length) ? (
          <div className="empty-card">
              <h2 className="message">Looks like you don't have a pet selected. Use the dropdown from above to select a pet.</h2>
          </div>
        ) : !props.currentPet.id ?
          <div className="empty-card">
            <h2 className="message">Looks like you don't any pets. Please create a pet so that you can get swiping!</h2>
          </div> : <></> }
        {(lastDirection && (lastDirection === 'right') && props.currentPet) ? <h2 id="top-dialog">{props.currentPet.name} loved {explorePets[currentIndex + 1].name}!</h2>
        : (lastDirection && (lastDirection === 'left') && props.currentPet) ? <h2 id="top-dialog">{props.currentPet.name} passed on {explorePets[currentIndex + 1].name}</h2>
        : props.currentPet?.name ? <div id="top-dialog"><h2 >Swipe right to love a pet, and swipe left to pass!</h2><p>Click the pet's name to view some more info!</p></div> : <></>}
        <div className='cardContainer' style={props.currentPet.id ? {height: "65vh"} : {}}>
          {explorePets.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className='swipe'
              key={character.name}
              onSwipe={(dir) => swiped(dir, character?.name, index)}
              onCardLeftScreen={() => outOfFrame(character?.name, index)}
            >
              <Card style={clicked ? {width: "100%"} : {}}>
                <Card.Img
                  draggable="false"
                  style={clicked ? {maxWidth: "50%"} : {}}
                  variant="left"
                  src={character.photo_url}
                  alt="Card image"
                  />
                  {!clicked ? (<h1 onClick={click}>{character.name}</h1>):<></>}
                  {clicked ? (<Card.Body>
                  <div className='cardInfo' >
                  <h2 onClick={click}>{character.name}<hr/></h2>
                    <p>
                      <b>Breed:</b> {character.breed}<br />
                      <b>Age:</b> {character.age}<br />
                      <b>Sex:</b> {character.sex}<br />
                      <b>Size:</b> {character.size}<br />
                      <b>City:</b> {character.city}<br />
                      <b>Description:</b> {character.description}
                    </p>
                    <button className='button back' onClick={click} ><FontAwesomeIcon icon={faArrowLeft} /></button>
                  </div>
                  </Card.Body>) : <></>}
              </Card>
            </TinderCard>
          ))}
        </div>
        {explorePets.length ? <div className='buttons'>
          <button className='button xmark' onClick={() => swipe('left')}><FontAwesomeIcon icon={faXmark} /></button>
          <button className='button heart' onClick={() => swipe('right')}><FontAwesomeIcon icon={faHeart} /></button>
        </div> : <></>}
      </div>
  )
}

export default Advanced;
