import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  NavDropdown  from "react-bootstrap/NavDropdown";

import logo from "./styling/pawprint.svg"
import "./styling/NavBar.scss";


const NavBar = (props) => {
  const { user, loginWithRedirect, logout, isLoading } = props;

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
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
              <Nav.Link href="/explore">Explore</Nav.Link>
              <Nav.Link href="/matches">Matches</Nav.Link>
              <Nav.Link href="/messages">Messages</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
                <NavDropdown title="Pets" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/pets/view"> View Pets</NavDropdown.Item>
                  <NavDropdown.Item href="/pets/new"> Create a Pet</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/" onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>Logout</Nav.Link>
              </>
            ): isLoading ? (<><Navbar.Text>Loading...</Navbar.Text></>) :
            (
              <Nav.Link href="/" onClick={() => loginWithRedirect()}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};

export default NavBar;
