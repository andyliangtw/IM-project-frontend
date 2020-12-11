import React, { Component } from 'react';
import { Carousel, Card, CardColumns, Image } from 'react-bootstrap';

import AddCartButton from '../AddCartButton';
import { formatPrice } from '../../utils';

import slide1 from '../../img/slide1.svg';
import slide2 from '../../img/slide2.svg';
import slide3 from '../../img/slide3.svg';
import card from '../../img/card.svg';
import userImg from '../../img/user.svg';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.renderSlider = this.renderSlider.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.renderProductCards = this.renderProductCards.bind(this);
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

  renderUsers() {
    return (
      <div>
        <Image src={userImg} roundedCircle />
      </div>
    );
  }

  renderProductCards() {
    const datas = [
      {
        item_id: '5fce2816c9a550fbdeee3761',
        name: 'Product1',
        price: 10,
      },
      {
        item_id: '5fce2816c9a550fbdeee3761',
        name: 'Product2',
        price: 20,
      },
    ];

    const cards = datas.map((data, i) => {
      return (
        <Card key={i}>
          <Card.Img variant="top" src={card} />
          <Card.Body>
            <Card.Title>
              <a href={`/product?pid=${data.item_id}`}>{data.name}</a>
            </Card.Title>
            <Card.Text>{formatPrice(data.price)}</Card.Text>
            <AddCartButton item_id={data.item_id} />
          </Card.Body>
        </Card>
      );
    });

    return <CardColumns>{cards}</CardColumns>;
  }

  render() {
    return (
      <>
        {this.renderSlider()}
        <br />
        {this.renderUsers()}
        <br />
        {this.renderProductCards()}
      </>
    );
  }
}
