const React = require('react');
import { Table } from 'reactstrap';

class PointsTable extends React.Component {
  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>X</th>
            <th>Y</th>
            <th>Z</th>
          </tr>
        </thead>
        <tbody>
          { this.props.points.map((point, i) => (
            <tr key={i}>
              <th>{i}</th>
              <td>{point[0]}</td>
              <td>{point[1]}</td>
              <td>{point[2]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default PointsTable;
