import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faXmark, faUndo, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import "./styling/MatchListTest.scss";
import Popup from './Popup';

function Advanced (props) {
  const db = props.pets;
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [clicked, setClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/matches");
      const data = await response.json();
      if (data.queryUpdated) {
        setShowPopup(true);
      }
    };
    fetchData();
  }, []);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db.length]
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const click = () => {setClicked(!clicked)}

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) {return}
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className='matchlist'>
      {showPopup && <Popup />}
      <h1>Explore!</h1>
      <div className='cardContainer' >
        {db.map((character, index) => (
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
              <button onClick={click} ><FontAwesomeIcon icon={faArrowLeft} /></button>
          </div>) : <></>}
          </TinderCard>

        ))}
      </div>
      <div className='buttons'>
        <button onClick={() => swipe('left')}><FontAwesomeIcon icon={faXmark} /></button>
        <button onClick={() => goBack()}><FontAwesomeIcon icon={faUndo} /></button>
        <button onClick={() => swipe('right')}><FontAwesomeIcon icon={faHeart} /></button>
      </div>
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
