import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import "./styling/MatchListTest.scss";
import Popup from './Popup';
import shuffle from './helpers/shuffleArray';


function Advanced(props) {
  const [explorePets, setExplorePets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(explorePets.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [clicked, setClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  useEffect(() => {
    props.addMatch({ target: explorePets[currentIndex + 1], dir: lastDirection, currentPet: props.currentPet })
    .then(
      (matchResult)=> {
        console.log('matchResult', matchResult)
        if (matchResult && matchResult.pet_one_match && matchResult.pet_two_match) {
          setShowPopup(true);
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

  useEffect(() => {
    if (props.currentPet.id) {
      axios.get(`http://localhost:8080/api/pets/explore/${props.currentPet.id}`)
      .then((response) => {
        const data = Object.entries(response.data).map(([key, value]) => ({ ...value }))
        setExplorePets(shuffle(data).slice(0,25));
      });}
  }, [props.currentPet])

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, name, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const click = () => { setClicked(!clicked) }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
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
    showPopup ? <Popup setShowPopup={setShowPopup} petName={props.currentPet} otherPetName={explorePets[currentIndex + 1]} /> :

      <div className='matchlist'>
        <h1>Explore!</h1>
        <Dropdown id="petDropdown">
          <span>{props.currentPet.name ? `Finding match for ${props.currentPet.name}` : 'Select pet to search for'}</span>
          <Dropdown.Toggle id="dropdown-basic">
            Pets
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {props.userPets.map((pet) => {
              return <Dropdown.Item key={pet.id} onClick={() => props.setCurrentPet(pet)}>{pet.name}</Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown>

        <div className='cardContainer' >
          {explorePets.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className='swipe'
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <div
                style={{ backgroundImage: 'url(' + character.photo_url + ')' }}
                className='card'
              >
                <h3 onClick={click}>{character.name}</h3>
              </div>
              {clicked ? (<div className='cardInfo' >
                <p>
                  <b>Breed:</b> {character.breed}<br />
                  <b>Age:</b> {character.age}<br />
                  <b>Sex:</b> {character.sex}<br />
                  <b>Size:</b> {character.size}<br />
                  <b>City:</b> {character.city}<br />
                  <b>Description:</b> {character.description}
                </p>
                <button className='button' onClick={click} ><FontAwesomeIcon icon={faArrowLeft} /></button>
              </div>) : <></>}
            </TinderCard>

          ))}
        </div>
        {explorePets.length ? <div className='buttons'>
          <button className='button' onClick={() => swipe('left', explorePets[currentIndex])}><FontAwesomeIcon icon={faXmark} /></button>
          <button className='button' onClick={() => swipe('right', explorePets[currentIndex])}><FontAwesomeIcon icon={faHeart} /></button>
        </div> : <></>}
        {lastDirection ? (
          <h2 key={lastDirection} className='infoText'>
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className='infoText'>
          </h2>
        )}
      </div>
  )
}

export default Advanced;
