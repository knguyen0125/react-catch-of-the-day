import React, { Component, ChangeEventHandler, FormEventHandler } from 'react';
import { Fish } from '@/sample-fishes';

interface Props {
  fish: Fish;
  index: string;
  updateFish: (key: string, updatedFish: Fish) => void;
  deleteFish: (key: string) => void;
}

export default class EditFishForm extends Component<Props> {
  handleChange: ChangeEventHandler<any> = e => {
    console.log(e.currentTarget.value);
    const updatedFish: Fish = {
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };

  onSubmit: FormEventHandler<HTMLFormElement> = e => {
    //
    e.preventDefault();
    this.props.deleteFish(this.props.index);
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={this.props.fish.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="price"
          value={this.props.fish.price}
          onChange={this.handleChange}
        />
        <select
          name="status"
          placeholder="status"
          value={this.props.fish.status}
          onChange={this.handleChange}
        >
          <option value="available">Available</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          placeholder="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          value={this.props.fish.image}
          onChange={this.handleChange}
        />
        <button type="submit">Remove Fish</button>
      </form>
    );
  }
}
