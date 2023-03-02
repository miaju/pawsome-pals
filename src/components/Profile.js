import React from "react";
import { Button } from "react-bootstrap";

import "./styling/Profile.scss";

const Profile = (props) => {
  const { user, isAuthenticated, logout} = props;

  return (
    isAuthenticated && (
      <div className="profile">
        <h1>Profile</h1>
        <div>
          <img src={user.picture} alt={user.name} />
          <div className="info">
            <p>Email: {user.name}</p>
            <p><Button size="sm" variant="outline-secondary" href="/pets/view"> View My Pets </Button></p>
            <p><Button size="sm" variant="outline-secondary" href="/pets/new">Create A New Pet </Button></p>
            <p><Button size="lg" variant="danger" onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>Logout</Button></p>
          </div>
        </div>

      </div>
    )
  );
};

export default Profile;
