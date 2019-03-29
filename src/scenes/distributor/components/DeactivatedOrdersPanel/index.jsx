'use strict';

import React from 'react';
import {observer} from 'mobx-react';

import Panel from 'components/Panel';
import {Btn, List, ListItem, SelectableUnit} from '../../styles';
import {Columns} from './styles';

@observer
class BrandOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUnits: []
    };
  }

  pickUnit(unitId) {
    this.setState({selectedUnits: [...this.state.selectedUnits, unitId]})
  }

  formOrder = () => {
    this.setState({loading: true});
    this.props.formOrder(this.state.selectedUnits);

    this.setState({
      selectedUnits: [],
      loading: false
    });
  };

  render() {
    return (
      <Panel heading="Deactivated orders" long wide>
        <Columns>
          <List>
            {this.props.orders.map(order => <ListItem key={order.id}>{`Id - ${order.id}, unit ID's: ${order.unitIds}`}</ListItem>)}
          </List>

          <List>
            {this.props.units.map((unit, index) => (
              <SelectableUnit
                key={`${index}-${unit.payload}`}
                onClick={() => this.pickUnit(unit.id)}
                selected={this.state.selectedUnits.some(unitId => unit.id === unitId)}
              >
                {`${unit.id} - ${unit.payload}`}
              </SelectableUnit>
            ))}
          </List>


        </Columns>

        <Btn onClick={this.formOrder}>Create order</Btn>
      </Panel>
    );
  }
}

export default BrandOrders;