'use strict';

import React from 'react';
import {observer} from 'mobx-react';

import Panel from 'components/Panel';
import {Btn, List, ListItem, SelectableUnit} from '../../styles';
import {Columns} from './styles'

const BrandOrders = observer(({units, pickUnit, selectedUnits, orders, formOrder}) => (
  <Panel heading="Orders" long wide>
    <Columns>
      <List>
        {units.filter(unit => unit.orderId === 0).map((unit, index) => (
          <SelectableUnit
            key={`${index}-${unit.payload}`}
            onClick={() => pickUnit(unit.id)}
            selected={selectedUnits.some(unitId => unit.id === unitId)}
          >
            {`${unit.id} - ${unit.payload}`}
          </SelectableUnit>
        ))}
      </List>

      <List>
        {orders.map(order => <ListItem key={order.id}>{`Id - ${order.id}, unit ID's: ${order.unitIds}`}</ListItem>)}
      </List>
    </Columns>

    <Btn onClick={formOrder}>Create order</Btn>
  </Panel>
));

export default BrandOrders;