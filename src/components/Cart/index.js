import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import getInfoAPI from '../../api/getInfoAPI';
import operationAPI from '../../api/operationAPI';
import transactionAPI from '../../api/transactionAPI';
import { isLogin, formatPrice } from '../../utils';

import '../style.scss';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      haveClickedCheckout: false,
    };
  }

  componentDidMount() {
    this.getCartInfo();
  }

  async getCartInfo() {
    const userId = localStorage.getItem('userId');
    const { data: res } = await getInfoAPI.userInfo({ userId });
    const cartList = res.cart_list;

    const products = await Promise.all(
      Object.keys(cartList).map(async (itemId) => {
        const { data: res } = await getInfoAPI.itemInfo({ itemId });
        return { ...res, id: itemId, amount: cartList[itemId] };
      }),
    );
    this.setState({ products });
  }

  renderRemoveCartBtn(i) {
    const handleRemoveCartBtnClick = async () => {
      const { products } = this.state;
      const data = {
        item_id: products[i].id,
        amount: products[i].amount,
      };
      await operationAPI.removeCart(data);
      products.splice(i, 1);
      this.setState({ products });
    };

    return (
      <Button className="beauty-btn" onClick={handleRemoveCartBtnClick}>
        Remove all
      </Button>
    );
  }

  renderCheckoutBtn() {
    const handleCheckoutBtnClick = async () => {
      this.setState({ haveClickedCheckout: true });
      try {
        const { data: res } = await transactionAPI.confirmOrder();
        alert(res?.response);
        window.location.href = '/';
      } catch (err) {
        console.log(err);
        alert(err?.response?.data?.response);
      }
    };

    const { haveClickedCheckout } = this.state;
    return (
      <Button className="beauty-btn" onClick={handleCheckoutBtnClick}>
        {haveClickedCheckout ? 'Please Wait...' : 'Checkout'}
      </Button>
    );
  }

  render() {
    if (!isLogin()) {
      return <Redirect to="/" />;
    }

    const { products } = this.state;
    let overAllPrice = 0;
    const cart = products.map((product, i) => {
      const totalPrice = product.price * product.amount;
      overAllPrice += totalPrice;
      return (
        <tr key={i}>
          <td>
            <a href={`/product?pid=${product.id}`}>{product.name}</a>
          </td>
          <td>{formatPrice(product.price)}</td>
          <td>{product.amount}</td>
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
              <th>Name</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total Price</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>{cart}</tbody>
        </Table>
        <h5>Total Price: {formatPrice(overAllPrice)}</h5>
        {this.renderCheckoutBtn()}
      </div>
    );
  }
}
