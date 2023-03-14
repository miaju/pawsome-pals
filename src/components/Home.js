import React from "react";
import Button from "react-bootstrap/Button";
import banner from "./styling/homepage-banner.jpg"

import "./styling/Home.scss";

const Home = (props) => {
  const { user, loginWithRedirect, isLoading } = props;

  return (

    (isLoading ? (
      <></>
    ) : user ?
    <>
    <div className="home">
      <img className="home-banner" src={banner} alt="banner"/>
      <div className="banner-text">
        <h1>Welcome {user.name}!</h1>
        <p>
          Check out the <a href="/explore"> explore page</a> to go on <b>Paw</b>some Playdates!
        </p>
      </div>
    </div>
    </> :
    <>
      <div className="home">
        <img className="home-banner" src={banner} alt="banner"/>
        <div className="logout-text">
          <h1>Welcome to <b>Paw</b>some Pals!</h1>
          <p>Here you can make friends for life for your pet!</p>
          <p>Please log in to get started.</p>
          <Button size="lg" onClick={loginWithRedirect}>Login</Button>
        </div>
      </div>
    </> )

  );

};

export default Home;
