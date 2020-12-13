import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import getInfoAPI from '../../api/getInfoAPI';
import { formatPrice } from '../../utils';

export default class User extends Component {
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
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('uid');

    const res = await getInfoAPI.userInfo({ userId });
    const rd = res.data;

    const sell_list = rd.sell_list;
    const new_sell_list = await Promise.all(
      Object.keys(sell_list).map(async (itemId) => {
        const res = await getInfoAPI.itemInfo({ itemId });
        return { ...res.data, id: itemId, amount: sell_list[itemId] };
      }),
    );

    const data = { ...rd, sell_list: new_sell_list };
    this.setState({ data });
  }

  renderSellList() {
    const { sell_list } = this.state.data;
    const rows = sell_list?.map((product, i) => {
      return (
        <tr key={i}>
          <td>
            <a href={`/product?pid=${product.id}`}>{product.name}</a>
          </td>
          <td>{formatPrice(product.price)}</td>
          <td>{product.amount}</td>
        </tr>
      );
    });

    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
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
        <h4>Sell list:</h4>
        {this.renderSellList()}
      </div>
    );
  }
}
