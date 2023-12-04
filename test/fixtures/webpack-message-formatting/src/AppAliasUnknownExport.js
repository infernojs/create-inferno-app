import { Component } from 'inferno';
import { bar as bar2 } from './AppUnknownExport';

class App extends Component {
  componentDidMount() {
    bar2();
  }
  render() {
    return <div />;
  }
}

export default App;
