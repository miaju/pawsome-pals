import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faXmark, faUndo } from '@fortawesome/free-solid-svg-icons';

import "./styling/MatchListTest.scss";


function Advanced (props) {
  const db = props.pets.slice(0,4);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [clicked, setClicked] = useState(false);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)


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
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className='matchlist'>
      <h1>Explore!</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <><TinderCard
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
          </TinderCard>
          {clicked ? (<div className='cardInfo' >
              Breed: {character.breed}<br />
              Age: {character.age}<br />
              Sex: {character.sex}<br />
              Size: {character.size}<br />
              City: {character.city}<br />
              Description: {character.description}
          </div>) : <></>}</>
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
