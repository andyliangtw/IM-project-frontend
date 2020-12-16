import React, { Component } from 'react';
import { Carousel, CardDeck, Card, Image } from 'react-bootstrap';

import AddCartBtn from '../AddCartBtn';
import getInfoAPI from '../../api/getInfoAPI';
import { isLogin, formatPrice } from '../../utils';

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
      sellers: [],
      products: [],
    };
  }

  componentDidMount() {
    this.getSellersInfo();
    this.getProductsInfo();
  }

  async getSellersInfo() {
    const { data: res } = await getInfoAPI.allCollector({
      length: SELLER_DISPLAY_AMOUNT,
    });
    const collectors = res.collectors;

    const sellers = await Promise.all(
      collectors.map(async (seller) => {
        const userId = seller.$oid;
        const { data: res } = await getInfoAPI.userInfo({ userId });
        return { ...res, id: userId };
      }),
    );
    this.setState({ sellers });
  }

  async getProductsInfo() {
    const { data: res } = await getInfoAPI.allProduct({
      length: PRODUCT_DISPLAY_AMOUNT,
    });
    const rd = res.products;

    const products = await Promise.all(
      rd.map(async (product) => {
        const itemId = product.itemId;
        const { data: res } = await getInfoAPI.itemInfo({ itemId });
        return { ...res, id: itemId, amount: product.amounts };
      }),
    );

    this.setState({ products });
  }

  renderSlider() {
    return (
      <Carousel>
        <Carousel.Item>
          <Image src={banner1} alt="First banner" fluid />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={banner2} alt="Second banner" fluid />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={banner3} alt="Third banner" fluid />
        </Carousel.Item>
      </Carousel>
    );
  }

  renderSellerCards() {
    const { sellers } = this.state;
    const sellerCards = sellers.map((seller, i) => {
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
            <a href={`/user?uid=${seller.id}`}>{seller.username}</a>
          </h3>
        </div>
      );
    });

    return <div>{sellerCards}</div>;
  }

  renderProductCards() {
    const { products } = this.state;
    const cards = products.map((product, i) => {
      return (
        <Card key={i} style={{ minWidth: '18rem', maxWidth: '18rem' }}>
          <Card.Img
            variant="top"
            src={product.image_urls ? product.image_urls[0] : productDefaultImg}
          />
          <Card.Body>
            <Card.Title>
              <a href={`/product?pid=${product.id}`}>{product.name}</a>
            </Card.Title>
            <Card.Text>
              <b>{formatPrice(product.price)}</b>
            </Card.Text>
            <Card.Text>
              Remain: <b>{product.amount}</b>
            </Card.Text>
            {isLogin() ? (
              localStorage.getItem('userId') === product.owner?.$oid ? (
                <p>This is Your Product</p>
              ) : (
                <AddCartBtn item_id={product.id} />
              )
            ) : (
              <p>Please login to buy</p>
            )}
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
        {this.renderSellerCards()}
        <br />
        {this.renderProductCards()}
      </>
    );
  }
}
