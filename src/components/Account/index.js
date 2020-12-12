import React, { Component } from 'react';
// import { Form, Button } from 'react-bootstrap';

import getInfoAPI from '../../api/getInfoAPI';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const userId = localStorage.getItem('userId');
    await getInfoAPI.userInfo({ userId });

    const res = await getInfoAPI.userInfo({ userId });
    this.setState({ ...res.data });
  }

  render() {
    return (
      <div>
        <h3>{this.state.username}</h3>
        <p>Email: {this.state.email}</p>
        <p>Wallet: {this.state.wallet_address}</p>
        <p>- Balance: {this.state.balance}</p>
      </div>
    );
  }
}
