import React, { Component } from 'react';
import { Breadcrumb, Image, Carousel, Row, Col } from 'react-bootstrap';

import AddCartBtn from '../AddCartBtn';
import getInfoAPI from '../../api/getInfoAPI';
import { formatPrice } from '../../utils';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      owner: {},
      buyAmount: 1,
    };
    this.handleBuyAmountChange = this.handleBuyAmountChange.bind(this);
  }

  componentDidMount() {
    this.getProductInfo();
  }

  async getProductInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('pid');

    const res_item = await getInfoAPI.itemInfo({ itemId });
    const rd_item = res_item.data;

    const oid = rd_item.owner.$oid;
    const res_user = await getInfoAPI.userInfo({ userId: oid });
    const owner = res_user.data;

    const product = {
      ...res_item.data,
      id: itemId,
      amount: owner.sell_list[itemId],
    };
    this.setState({ product, owner });
  }

  handleBuyAmountChange(e) {
    this.setState({ buyAmount: Number(e.target.value) });
  }

  render() {
    const { product, owner, buyAmount } = this.state;
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <Carousel>
              {product.image_urls?.map((image_url, i) => (
                <Carousel.Item key={i}>
                  <Image src={image_url} thumbnail />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <a href={`/user?uid=${owner._id?.$oid}`}>{owner.username}</a>
            </p>
            <p className="text-danger">{formatPrice(product.price)}</p>
            <p>
              Remain:{' '}
              <span
                className={product.amount < 15 ? 'text-danger' : 'text-info'}>
                {product.amount}
              </span>
            </p>
            <p>
              Buy :{' '}
              <input
                type="number"
                step="1"
                min="1"
                max={product.amount}
                value={buyAmount}
                onChange={this.handleBuyAmountChange}
                required
              />
            </p>
            <AddCartBtn item_id={product.id} amount={buyAmount} />
          </Col>
        </Row>
      </>
    );
  }
}
