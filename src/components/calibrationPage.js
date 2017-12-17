const React = require('react');
import { Container, Row, Col, Form } from 'reactstrap';
import VRContainer from './vrContainer.js';
import LightsContainer from './lightsContainer.js';
import PointsTable from './pointsTable.js';
import IndexControls from './indexControls.js';
import ExportTree from './exportTree.js';

class CalibrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: [],
      index: 0
    };
  }

  handlePoint(point) {
    // console.log(point);
    const newPoints = [ ...this.state.points ];
    newPoints[this.state.index] = point;

    this.setState({
      points: newPoints,
      index: this.state.index + 1
    });
  }

  updateIndex(index) {
    this.setState({
      index: index
    });
  }

  render() {
    return (<Container fluid>
      <Row>
        <Col style={{height: '100vh', overflowY: 'scroll'}}>
          <h1>node-christmas-lights Calibration</h1>

          <Row>
            <Col>
              <Form inline>
                <LightsContainer currentLight={ this.state.index } />
                <IndexControls
                  index={ this.state.index }
                  updateIndex= { this.updateIndex.bind(this) }
                />
                <ExportTree points={ this.state.points } />
              </Form>
            </Col>
          </Row>

          <PointsTable points={this.state.points} />
        </Col>
        <Col style={{height: '100vh'}}>
          <VRContainer
            gotPoint={ this.handlePoint.bind(this) }
            points = { this.state.points }
          />
        </Col>
      </Row>
    </Container>);
  }
}

export default CalibrationPage;
