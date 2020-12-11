import React, { Component } from 'react';

import getInfoAPI from '../../api/getInfoAPI';

export default class User extends Component {
  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('uid');
    await getInfoAPI
      .userInfo({ userId })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return <div></div>;
  }
}
