import { Component } from 'inferno';
import five from './export5';

class App extends Component {
  render() {
    return <div className="App">{five}</div>;
  }
}

export default App;
