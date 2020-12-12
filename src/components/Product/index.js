import React, { Component } from 'react';
import { Breadcrumb, Image, Carousel, Row, Col } from 'react-bootstrap';

import AddCartBtn from '../AddCartBtn';
import getInfoAPI from '../../api/getInfoAPI';
import { formatPrice } from '../../utils';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      product: null,
      owner: null,
      buyAmount: 1,
    };
    this.handleBuyAmountChange = this.handleBuyAmountChange.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('pid');
    this.setState({ itemId });

    this.getProductInfo(itemId);
  }

  async getProductInfo(itemId) {
    let res = await getInfoAPI.itemInfo({ itemId });
    this.setState({ product: res.data });

    const oid = this.state.product?.owner?.$oid;
    res = await getInfoAPI.userInfo({ userId: oid });
    this.setState({ owner: res.data });
  }

  handleBuyAmountChange(e) {
    this.setState({ buyAmount: Number(e.target.value) });
  }

  render() {
    const { product, owner, itemId, buyAmount } = this.state;
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{product?.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <Carousel>
              {product?.image_urls.map((image_url, i) => (
                <Carousel.Item key={i}>
                  <Image src={image_url} thumbnail />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col>
            <h3>{product?.name}</h3>
            <p>{product?.description}</p>
            <p>
              <a href={`/user?uid=${owner?._id.$oid}`}>{owner?.username}</a>
            </p>
            <p className="text-danger">{formatPrice(product?.price)}</p>
            <p>
              Amount:{' '}
              <input
                type="number"
                step="1"
                min="1"
                value={buyAmount}
                onChange={this.handleBuyAmountChange}
                required
              />
            </p>
            <AddCartBtn item_id={itemId} amount={buyAmount} />
          </Col>
        </Row>
      </>
    );
  }
}
