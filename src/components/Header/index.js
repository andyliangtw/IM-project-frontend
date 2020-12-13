import React, { Component } from 'react';
import { Navbar, NavDropdown, Button } from 'react-bootstrap';

import { isLogin } from '../../utils';

import '../style.scss';

export default class Header extends Component {
  render() {
    return (
      <Navbar
        bg="light"
        expand="lg"
        sticky="top"
        className="justify-content-between">
        <Navbar.Brand href="/">團購小幫手</Navbar.Brand>
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
            <Button className="beauty-btn" href="/register">
              Register
            </Button>{' '}
            <Button className="beauty-btn" href="/login">
              Login
            </Button>
          </div>
        )}
      </Navbar>
    );
  }
}
