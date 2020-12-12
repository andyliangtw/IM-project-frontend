import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import getInfoAPI from '../../api/getInfoAPI';

export default class Account extends Component {
  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const userId = localStorage.getItem('userId');
    await getInfoAPI.userInfo({ userId });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Email" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" placeholder="Username" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="haveAcceptedTerms">
          <Form.Check
            required
            type="checkbox"
            label="I have accepted the terms."
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
