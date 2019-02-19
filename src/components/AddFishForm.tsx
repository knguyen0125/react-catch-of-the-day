import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Fish } from '@/sample-fishes';

interface Props {
  addFish: (fish: Fish) => void;
}

interface State extends Fish {
  status: 'available' | 'unavailable';
}

export default class AddFishForm extends Component<Props, State> {
  state: State = {
    name: '',
    price: 0,
    desc: '',
    status: 'available',
    image: ''
  };

  addFish = (fish: Fish) => {
    this.props.addFish(fish);
  };

  createFish = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.addFish(this.state);
    e.currentTarget.reset();
  };

  onNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ name: e.target.value });

  onPriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ price: parseFloat(e.target.value) });

  onStatusChange = (e: ChangeEvent<HTMLSelectElement>) =>
    this.setState({
      status: e.target.options[e.target.selectedIndex].text as
        | 'available'
        | 'unavailable'
    });

  onDescChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    this.setState({ desc: e.target.value });

  onImageChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ image: e.target.value });

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input
          type="text"
          name="price"
          placeholder="price"
          value={this.state.price}
          onChange={this.onPriceChange}
        />
        <select
          name="status"
          placeholder="status"
          value={this.state.status}
          onChange={this.onStatusChange}
        >
          <option value="available">Available</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" placeholder="desc" onChange={this.onDescChange} />
        <input
          type="text"
          name="image"
          placeholder="image"
          value={this.state.image}
          onChange={this.onImageChange}
        />
        <button type="submit">Add Fish</button>
      </form>
    );
  }
}
