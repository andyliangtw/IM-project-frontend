import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import { isLogin } from '../../utils';

export default class Header extends Component {
  componentDidUpdate() {
    console.log('header updated!');
  }

  render() {
    return (
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="/">團購小幫手</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Shop</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          {isLogin() ? (
            <NavDropdown
              title={localStorage.getItem('username') || 'User'}
              id="basic-nav-dropdown">
              <NavDropdown.Item href="/cart">My Cart</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/cart">My Sales</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Button href="/register" variant="link">
                Register
              </Button>{' '}
              <Button href="/login">Login</Button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
