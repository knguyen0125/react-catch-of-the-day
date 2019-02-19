import React, { Fragment, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getFunName } from '../helpers';
// Import RouteComponentProps to extend Props to get history

interface Props extends RouteComponentProps {}

interface State {}

export default class StorePicker extends React.Component<Props, State> {
  myInput = React.createRef<HTMLInputElement>();

  goToStore = (event: FormEvent) => {
    // Stop the form from submitting
    event.preventDefault();

    // Get text from input
    if (this.myInput.current) {
      const storeName = this.myInput.current.value;

      // Change page to /store/whatever
      this.props.history.push(`/store/${storeName}`);
    }
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit">Visit Store </button>
      </form>
    );
  }
}
