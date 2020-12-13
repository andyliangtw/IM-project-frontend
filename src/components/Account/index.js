import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import getInfoAPI from '../../api/getInfoAPI';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const userId = localStorage.getItem('userId');
    await getInfoAPI.userInfo({ userId });

    const res = await getInfoAPI.userInfo({ userId });
    this.setState({ data: res.data });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h2>{data.username}</h2>
        <p>
          Email:{' '}
          <a
            href={`mailto:${data.email}`}
            target="_blank"
            rel="noopener noreferrer">
            {data.email}
          </a>
        </p>
        <p>
          Wallet:{' '}
          <a
            href={`${process.env.REACT_APP_ETHERSCAN}${data.wallet_address}`}
            target="_blank"
            rel="noopener noreferrer">
            {data.wallet_address}
          </a>
        </p>
        <p>- Balance: {data.balance}</p>
      </div>
    );
  }
}
