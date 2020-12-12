import React, { Component } from 'react';
import {
  Navbar,
  NavDropdown,
  Button,
} from 'react-bootstrap';

import { isLogin } from '../../utils';

export default class Header extends Component {
  render() {
    return (
      <Navbar
        bg="light"
        expand="lg"
        sticky="top"
        className="justify-content-between">
        <Navbar.Brand href="/">團購小幫手</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ flexGrow: 0 }}>
          {isLogin() ? (
            <NavDropdown
              title={localStorage.getItem('username') || 'User'}
              id="basic-nav-dropdown">
              <NavDropdown.Item href="/cart">My Cart</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/sells">My Sells</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <div>
              <Button href="/register" variant="link">
                Register
              </Button>{' '}
              <Button href="/login">Login</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
