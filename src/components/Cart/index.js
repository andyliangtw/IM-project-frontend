import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

import getInfoAPI from '../../api/getInfoAPI';
import operationAPI from '../../api/operationAPI';
import { formatPrice } from '../../utils';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemIds: [],
      products: [],
      amounts: [],
    };
  }

  componentDidMount() {
    this.getCartInfo();
  }

  async getCartInfo() {
    const userId = localStorage.getItem('userId');
    const res = await getInfoAPI.userInfo({ userId });
    const cartList = res.data.cart_list;
    const itemIds = Object.keys(cartList).map((key) => key);
    const amounts = Object.values(cartList).map((amount) => amount);

    const products = await Promise.all(
      itemIds.map(async (itemId) => {
        const res = await getInfoAPI.itemInfo({ itemId });
        return res.data;
      }),
    );
    this.setState({ itemIds, products, amounts });
  }

  renderRemoveCartBtn(i) {
    const handleRemoveCartBtnClick = async () => {
      const { itemIds, products, amounts } = this.state;
      const params = { item_id: itemIds[i], amount: amounts[i] };
      await operationAPI.removeCart(params);
      itemIds.splice(i, 1);
      products.splice(i, 1);
      amounts.splice(i, 1);
      this.setState({ itemIds, products, amounts });
    };

    return <Button onClick={handleRemoveCartBtnClick}>Remove all</Button>;
  }

  render() {
    const { itemIds, products, amounts } = this.state;
    let overAllPrice = 0;
    const cart = products.map((product, i) => {
      const totalPrice = product.price * amounts[i];
      overAllPrice += totalPrice;
      return (
        <tr key={i}>
          <td>
            <a href={`/product?pid=${itemIds[i]}`}>{product.name}</a>
          </td>
          <td>{formatPrice(product.price)}</td>
          <td>{amounts[i]}</td>
          <td>{formatPrice(totalPrice)}</td>
          <td>{this.renderRemoveCartBtn(i)}</td>
        </tr>
      );
    });

    return (
      <div>
        <h2>My Cart</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td>Amount</td>
              <td>Total Price</td>
              <td>Operation</td>
            </tr>
          </thead>
          <tbody>{cart}</tbody>
        </Table>
        <h3>Total Price: {formatPrice(overAllPrice)}</h3>
        <Button>Checkout</Button>
      </div>
    );
  }
}
