import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import operationAPI from '../../api/operationAPI';

import './style.scss';

export default class AddCartBtn extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {}

  handleClick() {
    this.addToCart();
  }

  async addToCart() {
    const { item_id, amount = 1 } = this.props;

    const params = { item_id, amount };
    await operationAPI.addCart(params);
  }

  render() {
    return (
      <Button className="beauty-btn" onClick={this.handleClick}>
        Add To Cart
      </Button>
    );
  }
}
