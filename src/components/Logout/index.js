import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import userAPI from '../../api/userAPI';
// import Login from '../Login';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.userLogout = this.userLogout.bind(this);
  }

  async userLogout() {
    await userAPI
      .logout()
      .then(() => {
        console.log('logout success');
      })
      .catch(() => {
        console.log('logout failed');
      });
  }

  render() {
    this.userLogout();
    return <Redirect to={`/`} />;
  }
}
