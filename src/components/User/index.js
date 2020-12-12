import React, { Component } from 'react';

import getInfoAPI from '../../api/getInfoAPI';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      user: null,
      sellList: [],
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('uid');
    this.setState({ userId });

    const res = await getInfoAPI.userInfo({ userId });
    this.setState({ user: res.data });

    this.getSellListInfo();
  }

  async getSellListInfo() {
    const sellListIds = this.state.user.sell_list;
    const sellList = await Promise.all(
      Object.keys(sellListIds).map(async (itemId, i) => {
        const res = await getInfoAPI.itemInfo({ itemId });
        return res.data;
      }),
    );
    this.setState({ sellList });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return null;
    }

    return (
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
        <p></p>
      </div>
    );
  }
}
