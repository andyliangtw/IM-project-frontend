import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import userAPI from '../../api/userAPI';
import { isLogin } from '../../utils';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.userLogout = this.userLogout.bind(this);
    this.state = {
      haveLogout: false,
    };
  }

  componentDidMount() {
    this.userLogout().then(() => {
      this.setState({ haveLogout: true });
    });
  }

  async userLogout() {
    return await userAPI
      .logout()
      .then((res) => {
        console.log('logout success:\n', res.data.response);

        localStorage.removeItem('authToken');
        localStorage.removeItem('session_id');
        localStorage.removeItem('userId');
        localStorage.removeItem('authType');
        localStorage.removeItem('_id');
        localStorage.removeItem('username');

        window.location.href = '/';
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if (!isLogin()) {
      return <Redirect to="/" />;
    }

    return this.state.haveLogout ? <Redirect to={`/`} /> : <div />;
  }
}
