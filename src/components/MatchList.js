import React, { useEffect } from "react";
import { useState } from "react";
import "./styling/MatchListItem.scss"
import "./styling/MatchList.scss"
import MatchListItem from "./MatchListItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons'

export default function MatchList(props) {
  let [empty, setEmpty] = useState(false);

  let {pending, matchee, matches} = props;

  useEffect(() => {
    setTimeout(() => {
      setEmpty(true)
    },500)
  }, [])


  return (
    (matches && pending && matches) ? (
      <section className="matches-container">
        {matches.length ? <h1>Matches</h1> : <></>}
        {(matches.length) ? (
          matches.map(match => (
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
             current={props.current}
          />
           )
         )
        ) : (<></>)}
        {pending.length ? <h1>Pending Matches</h1> : <></>}
        {(pending.length) ? (
          pending.map(match => (
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
             current={props.current}
          />
           )
         )
        ) : (<></>)}
        {matchee.length ? <h1>Checkout who matched with You</h1> : <></>}
        {(matchee.length) ? (
          matchee.map(match => (
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
             current={props.current}
          />
           )
         )
        ) : (<></>)}
        { (empty && !matches.length && !matchee.length && !pending.length) &&
          <div className="empty-card">
            <h2 className="message">No existing match found for the current pet <FontAwesomeIcon icon={faFaceSadTear} /></h2>
          </div>
        }
      </section>
    ) : (<></>)
  );

  // return ( (matches && pending && matches) ?
  //   <section className="matches-container">
  //     {props.matches.length > 0 &&
  //       props.matches.map(match => (
  //         <MatchListItem
  //           key={match.id}
  //           id={match.id}
  //           name={match.name}
  //           breed={match.breed}
  //           age={match.age}
  //           sex={match.sex}
  //           size={match.size}
  //           spayed_or_neutered={match.spayed_or_neutered}
  //           city={match.city}
  //           description={match.description}
  //           photo_url={match.photo_url}
  //           current={props.current}
  //         />
  //         )
  //       )
  //     }
  //     <h1>Pending Matches</h1>
  //     {props.pending.length > 0 &&
  //       props.pending.map(match => (
  //         <MatchListItem
  //           key={match.id}
  //           id={match.id}
  //           name={match.name}
  //           breed={match.breed}
  //           age={match.age}
  //           sex={match.sex}
  //           size={match.size}
  //           spayed_or_neutered={match.spayed_or_neutered}
  //           city={match.city}
  //           description={match.description}
  //           photo_url={match.photo_url}
  //           current={props.current}
  //         />
  //         )
  //       )
  //     }
  //     <h1>Check out who matched with You</h1>
  //     {props.matchee.length > 0 &&
  //       props.matchee.map(match => (
  //         <MatchListItem
  //           key={match.id}
  //           id={match.id}
  //           name={match.name}
  //           breed={match.breed}
  //           age={match.age}
  //           sex={match.sex}
  //           size={match.size}
  //           spayed_or_neutered={match.spayed_or_neutered}
  //           city={match.city}
  //           description={match.description}
  //           photo_url={match.photo_url}
  //           current={props.current}
  //         />
  //         )
  //       )
  //     }
  //     { (!matches.length && !matchee.length && !pending.length) &&

  //       <div className="empty-card">
  //         <h2 className="message">No existing match found for the current pet <FontAwesomeIcon icon={faFaceSadTear} /></h2>
  //       </div>

  //     }
  //   </section> : <></>
  // )
}
