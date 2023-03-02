import React from "react";
import Button from "react-bootstrap/Button";

import "./styling/Home.scss";

const Home = (props) => {
  const { user, loginWithRedirect, isLoading } = props;

  return (

    (isLoading ? (
      <></>
    ) : user ?
    <>
    <div className="home">
      <h1>Welcome {user.name}!</h1>
      <p>
        Why don't you check out the <a href="/explore"> explore page</a>?
      </p>
    </div>
    </> :
    <>
      <div className="home">
        <h1>Welcome to Pawsome Pals!</h1>
        <p>Here you can make friends for life for your pet!</p>
        <p>Please log in to get started.</p>
        <Button size="lg" onClick={loginWithRedirect}>Log in</Button>
      </div>
    </> )

  );

};

export default Home;
