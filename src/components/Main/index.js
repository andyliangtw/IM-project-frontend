import React, { Component } from 'react';
import { Carousel, Card, CardColumns, Image } from 'react-bootstrap';

import AddCartButton from '../AddCartButton';
import getInfoAPI from '../../api/getInfoAPI';
import { formatPrice } from '../../utils';

import { SELLER_DISPLAY_AMOUNT, PRODUCT_DISPLAY_AMOUNT } from './constant';
import slide1 from '../../img/slide1.svg';
import slide2 from '../../img/slide2.svg';
import slide3 from '../../img/slide3.svg';
import card from '../../img/card.svg';
import userImg from '../../img/user.svg';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerIds: [],
      sellers: [],
      productIds: [],
      products: [],
    };
  }

  componentDidMount() {
    this.getSellersInfo();
    this.getProductsInfo();
  }

  async getSellersInfo() {
    const res = await getInfoAPI.allCollector({
      length: SELLER_DISPLAY_AMOUNT,
    });
    const sellerIds = res.data.collectors.map((collector) => collector.$oid);
    this.setState({ sellerIds });

    const sellers = await Promise.all(
      sellerIds.map(async (sellerId) => {
        const res = await getInfoAPI.userInfo({ userId: sellerId });
        return res.data;
      }),
    );
    this.setState({ sellers });
  }

  async getProductsInfo() {
    const res = await getInfoAPI.allProduct({ length: PRODUCT_DISPLAY_AMOUNT });
    const productIds = res.data.products;
    this.setState({ productIds });

    const products = await Promise.all(
      productIds.map(async (productId) => {
        const res = await getInfoAPI.itemInfo({ itemId: productId });
        return res.data;
      }),
    );

    this.setState({ products });
  }

  renderSlider() {
    return (
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={slide1} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide2} alt="Third slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide3} alt="Third slide" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  renderSellers() {
    const sellers = this.state.sellers.map((seller, i) => {
      return (
        <h3 key={i}>
          <a href={`/user?uid=${this.state.sellerIds[i]}`}>{seller.username}</a>
        </h3>
      );
    });

    return <div>{sellers}</div>;
  }

  renderProductCards() {
    const cards = this.state.products.map((product, i) => {
      return (
        <Card key={i}>
          <Card.Img variant="top" src={card} />
          <Card.Body>
            <Card.Title>
              <a href={`/product?pid=${this.state.productIds[i]}`}>
                {product.name}
              </a>
            </Card.Title>
            <Card.Text>{formatPrice(product.price)}</Card.Text>
            <AddCartButton item_id={product.item_id} />
          </Card.Body>
        </Card>
      );
    });

    return <CardColumns>{cards}</CardColumns>;
  }

  render() {
    return (
      <>
        {/* {this.renderSlider()} */}
        <br />
        {this.renderSellers()}
        <br />
        {this.renderProductCards()}
      </>
    );
  }
}
