import React, { Component } from 'react';
import { Breadcrumb, Image, Carousel, Row, Col } from 'react-bootstrap';

import AddCartButton from '../AddCartButton';
import getInfoAPI from '../../api/getInfoAPI';
import { formatPrice } from '../../utils';

import aaa from '../../img/slide1.svg';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      product: null,
      owner: null,
    };
  }

  componentDidMount() {
    this.getProductInfo();
  }

  async getProductInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('pid');
    this.setState({ itemId });

    await getInfoAPI
      .itemInfo({ itemId })
      .then((res) => {
        const rd = res.data;
        this.setState({ product: rd });
      })
      .catch((err) => {
        console.error(err);
      });

    const oid = this.state.product?.owner?.$oid;
    await getInfoAPI
      .userInfo({ userId: oid })
      .then((res) => {
        const rd = res.data;
        this.setState({ owner: rd });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const options = [];
    for (let i = 0; i < 5; i++) {
      options.push(<option>{i + 1}</option>);
    }

    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{this.state.product?.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <Carousel>
              <Carousel.Item>
                {this.props.product?.image_urls.map((image_url, i) => {
                  return <Image key={i} src={image_url} fluid />;
                })}
                <Image src={aaa} fluid />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col>
            <h3>{this.state.product?.name}</h3>
            <p>{this.state.product?.description}</p>
            <p>
              <a href={`/user?uid=${this.state.owner?._id}`}>
                {this.state.owner?.username}
              </a>
            </p>
            <p className="text-danger">
              {formatPrice(this.state.product?.price)}
            </p>
            <p>
              Amount: <select>{options}</select>{' '}
            </p>
            <AddCartButton item_id={this.state.itemId} />
          </Col>
        </Row>
      </>
    );
  }
}
