import React, { Component, MouseEvent, MouseEventHandler } from 'react';
import { Fish } from '@/sample-fishes';
import { formatPrice } from '@/helpers';

interface Props {
  fish: Fish;
  addToOrder: (index: string) => void;
  index: string;
}

export default class SingleFish extends Component<Props> {
  handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    this.props.addToOrder(this.props.index);
  };

  render() {
    const { image, name, desc, price, status } = this.props.fish;
    const isAvailable = status === 'available';
    return (
      <div className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? 'Add To Cart' : 'Sold Out'}
        </button>
      </div>
    );
  }
}
