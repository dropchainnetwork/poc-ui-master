'use strict';

import React from 'react';
import {observer} from 'mobx-react';
import Panel from 'components/Panel';
import {Btn, List, SelectableUnit} from '../styles';

@observer
class UnitsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selectedUnitIds: []}
  }

  pickUnit = (unitId) => {
    this.setState({selectedUnitIds: [...this.state.selectedUnitIds, unitId]})
  };

  createNewOrder = () => {
    this.props.formOrder(this.state.selectedUnitIds);

    this.setState({selectedUnitIds: []});
  };

  render() {
    return (
      <Panel heading="Units available for new orders" long>
        <List>
          {this.props.units.map(unit =>
            <SelectableUnit
              key={unit.id}
              onClick={() => this.pickUnit(unit.id)}
              selected={this.state.selectedUnitIds.some(id => unit.id === id)}
            >
              {`${unit.id} - ${unit.payload}`}
            </SelectableUnit>
          )}
        </List>

        <Btn onClick={this.createNewOrder}>Create Order</Btn>
      </Panel>
    )
  }
}

export default UnitsPanel;