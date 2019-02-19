import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RebaseBinding } from 're-base';
import sampleFishes, { Fish, Fishes } from '@/sample-fishes';
import base from '@/base';
import Header from '@/components/Header';
import Order from '@/components/Order';
import Inventory from '@/components/Inventory';
import SingleFish from '@/components/Fish';

type OrderType = { [k: string]: number };

interface State {
  fishes: Fishes;
  orders: OrderType;
}

interface Params {
  storeId: string;
}
interface Props extends RouteComponentProps<Params> {}

export default class App extends Component<Props, State> {
  ref!: RebaseBinding;

  state = {
    fishes: {} as Fishes,
    orders: {} as OrderType
  };

  addFish = (fish: Fish) => {
    // Take a copy of existing fishes
    const fishes: Fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key: string) => {
    const orders: OrderType = { ...this.state.orders };
    orders[key] = orders[key] + 1 || 1;
    this.setState({ orders });
  };

  removeFromOrder = (key: string) => {
    const orders: OrderType = { ...this.state.orders };
    delete orders[key];
    this.setState({ orders });
  };

  componentDidMount = () => {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(`${params.storeId}-orders`);
    this.ref = base.syncState(this.props.match.params.storeId, {
      context: this,
      state: 'fishes',
      then: () => {
        if (localStorageRef) {
          this.setState({ orders: JSON.parse(localStorageRef) });
        }
      }
    });
  };

  componentWillUnmount = () => {
    base.removeBinding(this.ref);
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    localStorage.setItem(
      `${this.props.match.params.storeId}-orders`,
      JSON.stringify(this.state.orders)
    );
  };

  updateFish = (key: string, updatedFish: Fish) => {
    const fishes: Fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  deleteFish = (key: string) => {
    const fishes: Fishes = { ...this.state.fishes };
    // @ts-ignore
    fishes[key] = null;
    this.setState({ fishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <SingleFish
                key={key}
                index={key}
                fish={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              >
                Fish
              </SingleFish>
            ))}
          </ul>
        </div>
        <Order {...this.state} removeFromOrder={this.removeFromOrder} />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          updateFishes={this.updateFish}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}
