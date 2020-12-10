import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import userAPI from '../../api/userAPI';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    const target = e.target;
    const data = {
      username: target.username.value,
      password: target.password.value,
    };
    if (!data.username) {
      alert('Please enter your username!');
    } else if (!data.password) {
      alert('Please enter your password!');
    } else {
      await userAPI
        .login(data)
        .then((authToken) => {
          localStorage.setItem(authToken);
          console.log('Login success', authToken);
          console.log(localStorage.getItem('authToken'));
          window.location.href = '/';
        })
        .catch((e) => {
          alert('Login Failed!');
          console.error(e);
        });
    }
  }

  render() {
    if (true) {
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
