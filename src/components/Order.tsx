import React, { Component, useLayoutEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Fishes } from '@/sample-fishes';
import { formatPrice } from '@/helpers';

type OrderType = { [k: string]: number };

type Props = {
  orders: OrderType;
  fishes: Fishes;
  removeFromOrder: (key: string) => void;
};

export default class Order extends Component<Props> {
  renderOrder = (key: string) => {
    const fish = this.props.fishes[key];
    const count = this.props.orders[key];
    if (!fish) return null;
    const isAvailable = fish && fish.status == 'available';

    const text = isAvailable
      ? ` lbs ${fish.name} ${formatPrice(count * fish.price)}`
      : `${fish.name} is no longer available`;

    return (
      <CSSTransition
        classNames="order"
        key={key}
        timeout={{ enter: 500, exit: 500 }}
      >
        <li key={key}>
          <span>
            {isAvailable ? (
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 500, exit: 500 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
            ) : null}
            {text}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.orders);
    const total = orderIds.reduce<number>((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.orders[key];
      const isAvailable = fish && fish.status == 'available';

      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return 0;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        {/* 
        //@ts-ignore */}
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total: <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
