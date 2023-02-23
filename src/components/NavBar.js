import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth0 } from "@auth0/auth0-react";
import  NavDropdown  from "react-bootstrap/NavDropdown";

import logo from "./pawprint.svg"


const NavBar = () => {
  const { user, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Pawsome Pals
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {user ? (
              <>
              <Nav.Link href="#explore">Explore</Nav.Link>
              <Nav.Link href="#matched">Matched</Nav.Link>
              <Nav.Link href="#messages">Messages</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
                <NavDropdown title="Pets" id="basic-nav-dropdown">
                  <NavDropdown.Item> View Pets</NavDropdown.Item>
                  <NavDropdown.Item> Create a Pet</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>Logout</Nav.Link>
              </>
            ): (
              <Nav.Link onClick={() => loginWithRedirect()}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};

export default NavBar;
