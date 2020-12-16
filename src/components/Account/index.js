import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import getInfoAPI from '../../api/getInfoAPI';
import transactionAPI from '../../api/transactionAPI';
import { isLogin, formatPrice } from '../../utils';

import '../style.scss';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.getAccountInfo();
  }

  async getAccountInfo() {
    const userId = localStorage.getItem('userId');
    await getInfoAPI.userInfo({ userId });

    const { data } = await getInfoAPI.userInfo({ userId });

    data.buy_transaction = await this.getTxInfo(data.buy_transaction);
    data.sell_transaction = await this.getTxInfo(data.sell_transaction);

    this.setState({ data });
  }

  async getTxInfo(txs) {
    return await Promise.all(
      txs.map(async (tx) => {
        const { data: tx_info } = await getInfoAPI.getTransactionInfo({
          transaction_address: tx.address,
        });
        tx_info.products = await this.getProductsInfo(tx_info.products);

        const { data: seller } = await getInfoAPI.userInfo({
          userId: tx_info.seller_id,
        });

        return { ...tx, ...tx_info, seller_name: seller.username };
      }),
    );
  }

  async getProductsInfo(products) {
    return await Promise.all(
      products.map(async (product) => {
        const itemId = product.id;
        const { data } = await getInfoAPI.itemInfo({ itemId });
        return { ...product, ...data };
      }),
    );
  }

  renderConfirmReceiveBtn(i) {
    const handleConfirmReceiveBtnClick = async () => {
      try {
        const { data } = this.state;
        const { buy_transaction } = data;
        buy_transaction[i].status = 'received';
        data.buy_transaction = buy_transaction;
        this.setState({ data });

        await transactionAPI.confirmReceive({
          transaction_address: buy_transaction[i].address,
        });
      } catch (err) {
        console.error(err);
        alert(`Transaction ${i} has error!\n${err?.response?.data?.response}`);
      }
    };

    return (
      <Button className="beauty-btn" onClick={handleConfirmReceiveBtnClick}>
        Received
      </Button>
    );
  }

  renderShopRecord() {
    const { data } = this.state;
    const { buy_transaction = [] } = data;
    console.log(buy_transaction);
    const rows = buy_transaction.map((tx, i) => {
      const products = tx.products.map((product, i) => {
        return (
          <p key={i}>
            <a
              href={`/product?pid=${product.id}`}
              target="_blank"
              rel="noopener noreferrer">
              {product.name}
            </a>
            : {formatPrice(product.price)} * {product.amount}
          </p>
        );
      });

      return (
        <tr key={i}>
          <td>{tx.created_time}</td>
          <td>
            <a
              href={`${process.env.REACT_APP_ETHERSCAN_URL}/tx/${tx.address}`}
              target="_blank"
              rel="noopener noreferrer">
              {tx.address.slice(0, 10)}...
            </a>
          </td>
          <td>
            <a
              href={`/user?uid=${tx.seller_id}`}
              target="_blank"
              rel="noopener noreferrer">
              {tx.seller_name}
            </a>
          </td>
          <td>{products}</td>
          <td>{formatPrice(tx.total_price)}</td>
          <td>
            {tx.status === 'received' ? (
              <p>
                {tx.status}
                <br />
                {tx.received_time ? <>({tx.received_time})</> : null}
              </p>
            ) : (
              tx.status
            )}
          </td>
          <td>
            {tx.status === 'pending' ? this.renderConfirmReceiveBtn(i) : null}
          </td>
        </tr>
      );
    });

    return (
      <>
        <h4>Shop Record</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Created Time</th>
              <th>TxAddress</th>
              <th>Seller</th>
              <th>Products</th>
              <th>Total price</th>
              <th>Status</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </>
    );
  }

  renderSoldProducts() {
    const { data } = this.state;
    const { sell_transaction = [] } = data;
    const rows = sell_transaction.map((tx, i) => {
      const products = tx.products.map((product, i) => {
        return (
          <p key={i}>
            <a
              href={`/product?pid=${product.id}`}
              target="_blank"
              rel="noopener noreferrer">
              {product.name}
            </a>
            : {formatPrice(product.price)} * {product.amount}
          </p>
        );
      });

      return (
        <tr key={i}>
          <td>{tx.created_time}</td>
          <td>
            <a
              href={`${process.env.REACT_APP_ETHERSCAN_URL}/tx/${tx.address}`}
              target="_blank"
              rel="noopener noreferrer">
              {tx.address.slice(0, 10)}...
            </a>
          </td>
          <td>{products}</td>
          <td>{formatPrice(tx.total_price)}</td>
          <td>
            {tx.status === 'received' ? (
              <p>
                {tx.status}
                <br />
                {tx.received_time ? <>({tx.received_time})</> : null}
              </p>
            ) : (
              tx.status
            )}
          </td>
        </tr>
      );
    });

    return (
      <>
        <h4>Sold Products</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Created Time</th>
              <th>TxAddress</th>
              <th>Products</th>
              <th>Total price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </>
    );
  }

  render() {
    if (!isLogin()) {
      return <Redirect to="/" />;
    }

    const { data } = this.state;
    return (
      <div>
        <h2>{localStorage.getItem('username')}</h2>
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
          Wallet Address:{' '}
          <a
            href={`${process.env.REACT_APP_ETHERSCAN_URL}/address/${data.wallet_address}`}
            target="_blank"
            rel="noopener noreferrer">
            {data.wallet_address}
          </a>
        </p>
        <p>Balance: {formatPrice(data.balance)}</p>
        {this.renderShopRecord()}
        <br />
        {this.renderSoldProducts()}
      </div>
    );
  }
}
