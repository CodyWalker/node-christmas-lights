const React = require('react');

import { Form, FormGroup, InputGroup, InputGroupButton, Input, Button, Label } from 'reactstrap';

class IndexControls extends React.Component {
  render() {
    return (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="currentIndex" className="mr-sm-2">Current Index</Label>
          <InputGroup>
            <InputGroupButton>
              <Button
                color="secondary"
                onClick={ () => this.props.updateIndex(this.props.index - 1) }
              >-</Button>
            </InputGroupButton>

            <Input
              id="currentIndex"
              value={ this.props.index }
              onChange={ (e) => this.props.updateIndex(parseInt(e.target.value)) }
            />

            <InputGroupButton>
              <Button
                color="secondary"
                onClick={ () => this.props.updateIndex(this.props.index + 1) }
              >+</Button>
            </InputGroupButton>
          </InputGroup>
        </FormGroup>
    );
  }
}

export default IndexControls;
