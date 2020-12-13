import React, { Component } from 'react';
import { Carousel, CardDeck, Card, Image } from 'react-bootstrap';

import AddCartBtn from '../AddCartBtn';
import getInfoAPI from '../../api/getInfoAPI';
import { formatPrice } from '../../utils';

import { SELLER_DISPLAY_AMOUNT, PRODUCT_DISPLAY_AMOUNT } from './constant';
import banner1 from '../../img/banner1.png';
import banner2 from '../../img/banner2.png';
import banner3 from '../../img/banner3.png';
import productDefaultImg from '../../img/product_default.svg';
import userDefaultImg from '../../img/user_default.svg';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerIds: [],
      sellers: [],
      productIds: [],
      products: [],
      amounts: [],
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
    const rd = res.data.products;
    const productIds = rd.map((product) => product.itemId);
    const amounts = rd.map((product) => product.amount);
    this.setState({ productIds, amounts });

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
          <Image src={banner1} alt="First slide" fluid />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={banner2} alt="Third slide" fluid />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={banner3} alt="Third slide" fluid />
        </Carousel.Item>
      </Carousel>
    );
  }

  renderSellers() {
    const sellers = this.state.sellers.map((seller, i) => {
      const url = `/user?uid=${this.state.sellerIds[i]}`;
      return (
        <div
          key={i}
          className="d-inline-flex flex-column align-items-center m-3">
          <Image
            src={userDefaultImg}
            style={{ width: '100px', height: '100px' }}
            roundedCircle
          />
          <h3>
            <a href={url}>{seller.username}</a>
          </h3>
        </div>
      );
    });

    return <div>{sellers}</div>;
  }

  renderProductCards() {
    const { products, productIds } = this.state;
    const cards = products.map((product, i) => {
      return (
        <Card key={i} style={{ minWidth: '18rem', maxWidth: '18rem' }}>
          <Card.Img
            variant="top"
            src={product.image_urls ? product.image_urls[0] : productDefaultImg}
          />
          <Card.Body>
            <Card.Title>
              <a href={`/product?pid=${productIds[i]}`}>{product.name}</a>
            </Card.Title>
            <Card.Text>{formatPrice(product.price)}</Card.Text>
            <AddCartBtn item_id={productIds[i]} />
          </Card.Body>
        </Card>
      );
    });

    return <CardDeck>{cards}</CardDeck>;
  }

  render() {
    return (
      <>
        {this.renderSlider()}
        <br />
        {this.renderSellers()}
        <br />
        {this.renderProductCards()}
      </>
    );
  }
}
