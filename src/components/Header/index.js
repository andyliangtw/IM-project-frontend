import React, { Component } from 'react';
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

export default class Header extends Component {
  render() {
    const isLogin = true;
    return (
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          {isLogin ? (
            <>
              <Button href="/register" variant="link">
                Register
              </Button>{' '}
              <Button href="/login">Login</Button>
            </>
          ) : (
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
