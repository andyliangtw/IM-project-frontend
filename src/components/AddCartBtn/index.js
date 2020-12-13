import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import operationAPI from '../../api/operationAPI';

import '../style.scss';

export default class AddCartBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  async handleClick() {
    const { item_id, amount = 1 } = this.props;
    const data = { item_id, amount };
    await operationAPI.addCart(data);
    this.setState({ isClicked: true });
  }

  handleMouseLeave() {
    this.setState({ isClicked: false });
  }

  render() {
    const { amount = 1 } = this.props;
    return (
      <Button
        className={
          this.isClicked ? 'beauty-btn beauty-btn-clicked' : 'beauty-btn'
        }
        onClick={this.handleClick}
        onMouseLeave={this.handleMouseLeave}>
        {' '}
        Add {amount} To Cart
      </Button>
    );
  }
}
