import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import "./style.scss";

import userAPI from '../../api/userAPI';
import { isLogin } from '../../utils';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    const userData = {
      username: target.username.value,
      password: target.password.value,
    };
    try {
      const res = await userAPI.login(userData);
      const rd = res.data;

      localStorage.setItem('authToken', rd.api_key.$binary);
      localStorage.setItem('session_id', rd.session_id);
      localStorage.setItem('userId', rd.userId.$oid);
      localStorage.setItem('authType', rd.api_key.$type);
      localStorage.setItem('_id', rd._id.$oid);
      localStorage.setItem('username', userData.username);

      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert(err.response.data.response);
    }
  }

  render() {
    if (isLogin()) {
      return <Redirect to="/" />;
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
        </Form.Group>
        <Button className="beauty-btn" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
