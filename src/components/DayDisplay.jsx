import React from 'react';
import PropTypes from 'prop-types';

import { Card, Collapsible, Button } from '@edx/paragon';

export class DayDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.functionKeys.reduce(
      (obj, key) => ({
        ...obj,
        [key]: '',
      }),
      {},
    );
  }

  get functionKeys() {
    return Object.keys(this.props.functions);
  }

  updateCard(key) {
    return () => this.setState({ [key]: this.props.functions[key]() });
  }

  render() {
    return (
      <Collapsible
        key={this.props.name}
        styling="card"
        title={<p><strong>Day {this.props.name}</strong></p>}
      >
        {this.functionKeys.map(key => (
          <>
            <Card>
              <Button key={key} onClick={this.updateCard(key)}>{key}</Button>
              <Card>
                <Card.Title>
                  Value
                </Card.Title>
                {this.state[key]}
              </Card>
            </Card>
          </>
        ))}
      </Collapsible>

    );
  }
}
DayDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  functions: PropTypes.objectOf(PropTypes.func),
};

export default DayDisplay;
