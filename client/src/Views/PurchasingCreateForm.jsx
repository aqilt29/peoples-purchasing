import React, { Component } from 'react';

class PurchasingCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'world',
    }

  }

  render () {
    const { hello } = this.state;

    return (
      <>
       <h3>{JSON.stringify(hello)}</h3>
      </>
    )
  }
}

export default PurchasingCreateForm;
