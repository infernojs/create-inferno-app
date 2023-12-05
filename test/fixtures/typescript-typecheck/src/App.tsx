import { Component } from 'inferno';

class App extends Component {
  render() {
    return <div>{format(123)}</div>;
  }
}

function format(value: string) {
  return value;
}

export default App;
