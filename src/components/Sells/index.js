import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import "./style.scss";

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
      isEdit: [],
    };
  }

  componentDidMount() {
    this.getSellsInfo();
  }

  async getSellsInfo() {
    const userId = localStorage.getItem('userId');
    const res = await getInfoAPI.userInfo({ userId });
    const sellList = res.data.sell_list;
    const itemIds = Object.keys(sellList).map((key) => key);
    const amounts = Object.values(sellList).map((amount) => amount);
    const isEdit = itemIds.map(() => false);

    const products = await Promise.all(
      itemIds.map(async (itemId) => {
        const res = await getInfoAPI.itemInfo({ itemId });
        return res.data;
      }),
    );
    this.setState({ itemIds, products, amounts, isEdit });
  }

  renderOperationBtns(i) {
    const { isEdit } = this.state;
    const handleDoneBtnClick = async (i) => {
      isEdit[i] = false;
      this.setState({ isEdit });
    };

    return isEdit[i] ? (
      <Button className="beauty-btn"
        onClick={() => {
          handleDoneBtnClick(i);
        }}>
        Done
      </Button>
    ) : (
      <>
        {this.renderEditBtn(i)} {this.renderRemoveProductBtn(i)}
      </>
    );
  }

  renderEditBtn(i) {
    const { isEdit } = this.state;
    const handleEditBtnClick = (i) => {
      isEdit[i] = true;
      this.setState({ isEdit });
    };

    return <Button className="beauty-btn" onClick={() => handleEditBtnClick(i)}>Edit</Button>;
  }

  renderRemoveProductBtn(i) {
    const handleRemoveProductBtnClick = async () => {
      const { itemIds, products, amounts } = this.state;
      await operationAPI.removeProduct({ item_id: itemIds[i] });
      itemIds.splice(i, 1);
      products.splice(i, 1);
      amounts.splice(i, 1);
      this.setState({ itemIds, products, amounts });
    };

    return <Button className="beauty-btn" onClick={handleRemoveProductBtnClick}>Remove</Button>;
  }

  render() {
    const { itemIds, products, amounts, isEdit } = this.state;

    const cart = products.map((product, i) => {
      const handleNameChange = (e) => {};
      const handlePriceChange = (e) => {};
      const handleAmountChange = (e) => {};
      return (
        <tr key={i}>
          {isEdit[i] ? (
            <>
              <td>
                <input
                  type="text"
                  value={product.name}
                  onChange={handleNameChange}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={product.price}
                  onChange={handlePriceChange}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={amounts[i]}
                  onChange={handleAmountChange}
                  required
                />
              </td>
            </>
          ) : (
            <>
              <td>
                <a href={`/product?pid=${itemIds[i]}`}>{product.name}</a>
              </td>
              <td>{formatPrice(product.price)}</td>
              <td>{amounts[i]}</td>
            </>
          )}
          <td>{this.renderOperationBtns(i)}</td>
        </tr>
      );
    });

    return (
      <div>
        <h2>My Sells</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td>Amount</td>
              <td>Operation</td>
            </tr>
          </thead>
          <tbody>{cart}</tbody>
        </Table>
        <Button className="beauty-btn">Add</Button>
      </div>
    );
  }
}
