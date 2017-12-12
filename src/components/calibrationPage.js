const React = require('react');
import VRContainer from './vrContainer.js';

class CalibrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: []
    };
  }

  handlePoint(point) {
    // console.log(point);
    this.setState({
      points: [ ...this.state.points, point ]
    })
  }

  render() {
    return (<div>
      <h1>Hello, world</h1>
      <VRContainer
        gotPoint={ this.handlePoint.bind(this) }
        points = { this.state.points }
      />
    </div>);
  }
}

export default CalibrationPage;
