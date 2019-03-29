'use strict';

import React from 'react';
import {observer} from 'mobx-react';

import Panel from 'components/Panel';
import {Btn, List, ListItem, SelectableUnit} from '../styles';

@observer
class OrdersPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selectedOrderId: null}
  }

  selectOrder = (orderId) => {
    this.setState({selectedOrderId: orderId})
  };

  action = () => {
    this.props.btnAction(this.state.selectedOrderId);

    this.setState({selectedOrderId: null});
  };

  render() {
    return (
      <Panel heading={this.props.heading}>
        <List>
          {this.props.orders.map(order =>
            <SelectableUnit
              key={order.id}
              onClick={() => this.selectOrder(order.id)}
              selected={order.id === this.state.selectedOrderId}
            >
              {`Id - ${order.id}, unit ID's: ${order.unitIds}`}
            </SelectableUnit>
          )}
        </List>

        {this.props.btnAction && <Btn onClick={this.action}>{this.props.btnText}</Btn>}
      </Panel>
    )
  }
}

export default OrdersPanel;