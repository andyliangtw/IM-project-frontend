import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

import getInfoAPI from '../../api/getInfoAPI';
import operationAPI from '../../api/operationAPI';
import { formatPrice, dCopy } from '../../utils';

import './style.scss';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemIds: [],
      products: [],
      products_prev: [],
      amounts: [],
      amounts_prev: [],
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
    this.setState({
      itemIds,
      products,
      products_prev: dCopy(products),
      amounts,
      amounts_prev: dCopy(amounts),
      isEdit,
    });
  }

  renderOperationBtns(i) {
    const { isEdit } = this.state;

    return isEdit[i] ? (
      <>
        {this.renderDoneBtn(i)} {this.renderCancelBtn(i)}
      </>
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

    return (
      <Button className="beauty-btn" onClick={() => handleEditBtnClick(i)}>
        Edit
      </Button>
    );
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

    return (
      <Button className="beauty-btn" onClick={handleRemoveProductBtnClick}>
        Remove
      </Button>
    );
  }

  renderDoneBtn(i) {
    const { isEdit, products, amounts, itemIds } = this.state;
    const handleDoneBtnClick = async (i) => {
      const newProduct = {
        item_id: itemIds[i],
        name: products[i].name,
        description: products[i].description,
        price: products[i].price,
        amount: amounts[i],
      };
      await operationAPI.reviseProduct(newProduct);

      isEdit[i] = false;
      this.setState({
        isEdit,
        products_prev: dCopy(products),
        amounts_prev: dCopy(amounts),
      });
    };

    return (
      <Button
        className="beauty-btn"
        onClick={() => {
          handleDoneBtnClick(i);
        }}>
        Done
      </Button>
    );
  }

  renderCancelBtn(i) {
    const { isEdit, products_prev, amounts_prev } = this.state;

    const handleCancelBtnClick = async (i) => {
      isEdit[i] = false;
      this.setState({
        isEdit,
        products: dCopy(products_prev),
        amounts: dCopy(amounts_prev),
      });
    };

    return (
      <Button
        className="beauty-btn"
        onClick={() => {
          handleCancelBtnClick(i);
        }}>
        Cancel
      </Button>
    );
  }

  render() {
    const { itemIds, products, amounts, isEdit } = this.state;
    const handleNameChange = (i, e) => {
      products[i].name = e.target.value;
      this.setState({ products });
    };
    const handleDescriptionChange = (i, e) => {
      products[i].description = e.target.value;
      this.setState({ products });
    };
    const handlePriceChange = (i, e) => {
      products[i].price = Number(e.target.value);
      this.setState({ products });
    };
    const handleAmountChange = (i, e) => {
      amounts[i] = Number(e.target.value);
      this.setState({ amounts });
    };

    const cart = products.map((product, i) => {
      return (
        <tr key={i}>
          {isEdit[i] ? (
            <>
              <td>
                <input
                  type="text"
                  value={product.name}
                  onChange={handleNameChange.bind(this, i)}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={product.description}
                  onChange={handleDescriptionChange.bind(this, i)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={product.price}
                  onChange={handlePriceChange.bind(this, i)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={amounts[i]}
                  onChange={handleAmountChange.bind(this, i)}
                  required
                />
              </td>
            </>
          ) : (
            <>
              <td>
                <a href={`/product?pid=${itemIds[i]}`}>{product.name}</a>
              </td>
              <td>{product.description}</td>
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
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>{cart}</tbody>
        </Table>
        <Button className="beauty-btn">Add</Button>
      </div>
    );
  }
}
