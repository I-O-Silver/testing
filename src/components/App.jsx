import React from 'react';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0
    };
  }

  buttonClicked(value) {
    value += this.state.counter;
    this.setState({
      counter: value
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">Counter App</h1>
        <p id="counter">{this.state.counter}</p>
        <button id="increment" onClick={() => this.buttonClicked(1)} >Increment</button>
        <button id="decrement" onClick={() => this.buttonClicked(-1)} >Decrement</button>
      </div>
    )
  }
}

export default App;