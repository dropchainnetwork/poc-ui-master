'use strict';

import React from 'react';
import {observer} from 'mobx-react';

import Panel from 'components/Panel';
import {Input, Btn, List, ListItem} from '../styles';

const BrandUnits = observer(({units, unitName, changeUnitName, createUnit}) => (
  <Panel heading="Units">
    <List>
      {units.map((unit, index) => (
        <ListItem key={`${index}-${unit.payload}`}>
          {`${unit.id} - ${unit.payload}, orderId - ${unit.orderId}`}
        </ListItem>
      ))}
    </List>

    <Input
      type="text"
      placeholder="Enter Unit name"
      value={unitName}
      onChange={changeUnitName}
    />
    <Btn onClick={createUnit}>Create Unit</Btn>
  </Panel>
));

export default BrandUnits;