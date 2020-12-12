import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import operationAPI from '../../api/operationAPI';

export default class AddCartButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {}

  handleClick() {
    this.addToCart();
  }

  async addToCart() {
    const item_id = this.props.item_id;
    const params = { item_id, amount: this.props.amount || 1 };
    await operationAPI.addCart(params);
  }

  render() {
    return <Button onClick={this.handleClick}>Add To Cart</Button>;
  }
}
