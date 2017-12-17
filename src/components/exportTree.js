const React = require('react');

import FileSaver from 'file-saver';
import { Button } from 'reactstrap';


class ExportTree extends React.Component {
  saveFile() {
    const tree = {
      size: this.props.points.length,
      rawPoints: this.props.points.map((point) => [
        point[0],
        point[1],
        point[2],
      ])
    };

    const jsonTree = JSON.stringify(tree, null, 2);

    const blob = new Blob([jsonTree], {type: "application/json;charset=utf-8"})
    FileSaver.saveAs(blob, "tree.json");
  }

  render() {
    return (
      <Button
        onClick={ this.saveFile.bind(this) }
      >Export Tree</Button>
    );
  }
}

export default ExportTree;
