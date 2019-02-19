import React, { Component, MouseEvent } from 'react';
import AddFishForm from '@/components/AddFishForm';
import { Fish, Fishes } from '@/sample-fishes';
import EditFishForm from '@/components/EditFishForm';

interface InventoryProps {
  fishes: Fishes;
  addFish: (fish: Fish) => void;
  loadSampleFishes: (e: MouseEvent<HTMLButtonElement>) => void;
  updateFishes: (key: string, updatedFish: Fish) => void;
  deleteFish: (key: string) => void;
}

export default class Inventory extends Component<InventoryProps> {
  render() {
    console.log(Object.keys(this.props.fishes));
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.entries(this.props.fishes).map(([key, fish]) => (
          <EditFishForm
            key={key}
            fish={fish}
            index={key}
            updateFish={this.props.updateFishes}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}
