import React, { Component } from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

import imgurAPI from '../../api/imgurAPI';
import getInfoAPI from '../../api/getInfoAPI';
import operationAPI from '../../api/operationAPI';
import { isLogin, formatPrice, dCopy } from '../../utils';

import '../style.scss';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      products_prev: [],
      isAdding: false,
    };
  }

  componentDidMount() {
    this.getSellsInfo();
  }

  async getSellsInfo() {
    const userId = localStorage.getItem('userId');
    const { data: res } = await getInfoAPI.userInfo({ userId });
    const sellList = res.sell_list;

    const products = await Promise.all(
      Object.keys(sellList).map(async (itemId) => {
        const { data: res } = await getInfoAPI.itemInfo({ itemId });
        return {
          ...res,
          id: itemId,
          amount: sellList[itemId],
          isEdit: false,
        };
      }),
    );
    this.setState({
      products,
      products_prev: dCopy(products),
    });
  }

  renderOperationBtns(i) {
    const { products } = this.state;
    return products[i].isEdit ? (
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
    const { products } = this.state;
    const handleEditBtnClick = (i) => {
      products[i].isEdit = true;

      this.setState({ products });
    };

    return (
      <Button className="beauty-btn" onClick={() => handleEditBtnClick(i)}>
        Edit
      </Button>
    );
  }

  renderRemoveProductBtn(i) {
    const handleRemoveProductBtnClick = async () => {
      const { products } = this.state;
      await operationAPI.removeProduct({ item_id: products[i].id });
      products.splice(i, 1);
      this.setState({
        products,
        products_prev: dCopy(products),
      });
    };

    return (
      <Button className="beauty-btn" onClick={handleRemoveProductBtnClick}>
        Remove
      </Button>
    );
  }

  renderDoneBtn(i) {
    const { products } = this.state;
    const handleDoneBtnClick = async (i) => {
      const newProduct = {
        item_id: products[i].id,
        name: products[i].name,
        description: products[i].description,
        price: products[i].price,
        amount: products[i].amount,
      };
      await operationAPI.reviseProduct(newProduct);

      products[i].isEdit = false;
      this.setState({
        products_prev: dCopy(products),
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
    const { products, products_prev } = this.state;

    const handleCancelBtnClick = (i) => {
      products[i].isEdit = false;
      this.setState({
        products: dCopy(products_prev),
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

  renderAddProductBtn() {
    const handleAddProductBtnClick = () => {
      this.setState({ isAdding: true });
    };

    return (
      <Button className="beauty-btn" onClick={handleAddProductBtnClick}>
        Add New One
      </Button>
    );
  }

  renderAddProductForm() {
    const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const form = e.target;
      form.addBtn.innerHTML = 'Please wait...';
      const image_urls = await Promise.all(
        Array.from(form.images.files).map(async (imageFile) => {
          const compressedFile = await imageCompression(imageFile, {
            maxSizeMB: 10,
            maxWidthOrHeight: 1920,
          });
          const { data: res } = await imgurAPI.uploadImage(compressedFile);
          return res.data.link;
          // return {url: res.data.data.link, deletehash: res.data.data.deletehash} // Backend not support deletehash now
        }),
      );

      const newProduct = {
        name: form.name.value,
        description: form.description.value,
        price: Number(form.price.value),
        amount: Number(form.amount.value),
        image_urls,
      };

      try {
        const { data: res } = await operationAPI.addProduct(newProduct);
        const { products } = this.state;
        newProduct.id = res.productId?.$oid;
        newProduct.isEdit = false;
        const newProducts = [...products, newProduct];

        this.setState({
          products: newProducts,
          products_prev: dCopy(newProducts),
          isAdding: false,
        });
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.response);
      }
    };

    const handleCancelBtnClick = () => {
      this.setState({ isAdding: false });
    };

    return (
      <>
        <h3>Add a New Product</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control required type="text" placeholder="Name" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="description">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Description" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="price">
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type="number"
                step="1"
                min="1"
                placeholder="1"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="amount">
            <Form.Label column sm={2}>
              Amount
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type="number"
                step="1"
                min="1"
                placeholder="1"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="images">
            <Form.Label column sm={2}>
              Images
            </Form.Label>
            <Col sm={10}>
              <Form.Control required type="file" accept="image/*" multiple />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" className="beauty-btn" id="addBtn">
                Add Product
              </Button>{' '}
              <Button type="reset" className="beauty-btn">
                Reset
              </Button>{' '}
              <Button className="beauty-btn" onClick={handleCancelBtnClick}>
                Cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </>
    );
  }

  renderTable() {
    const { products } = this.state;
    const handleChange = (i, type, e) => {
      products[i][type] =
        type === 'price' || type === 'amount'
          ? Number(e.target.value)
          : e.target.value;
      this.setState({ products });
    };

    const cart = products.map((product, i) => {
      return (
        <tr key={i}>
          {product.isEdit ? (
            <>
              <td>
                <input
                  value={product.name}
                  onChange={handleChange.bind(this, i, 'name')}
                  required
                />
              </td>
              <td>
                <input
                  value={product.description}
                  onChange={handleChange.bind(this, i, 'description')}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={product.price}
                  onChange={handleChange.bind(this, i, 'price')}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={product.amount}
                  onChange={handleChange.bind(this, i, 'amount')}
                  required
                />
              </td>
              <td>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  // onChange={handleImageUpload.bind(this, i, 'image')}
                />
              </td>
            </>
          ) : (
            <>
              <td>
                <a href={`/product?pid=${product.id}`}>{product.name}</a>
              </td>
              <td>{product.description}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{product.amount}</td>
              <td>
                {product.image_urls?.map((url, i) => {
                  return (
                    <>
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer">
                        {url.slice(0, 30)}...
                      </a>
                      <br />
                    </>
                  );
                })}
              </td>
            </>
          )}
          <td>{this.renderOperationBtns(i)}</td>
        </tr>
      );
    });

    return (
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Images</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>{cart}</tbody>
      </Table>
    );
  }

  render() {
    if (!isLogin()) {
      return <Redirect to="/" />;
    }

    const { isAdding } = this.state;
    return (
      <div>
        <h2>My Sells</h2>
        {this.renderTable()}
        {isAdding ? this.renderAddProductForm() : this.renderAddProductBtn()}
      </div>
    );
  }
}
