'use strict';

import React from 'react';

import Panel from 'components/Panel';
import {Info} from '../styles';

const SMBInfo = ({name, balance, address}) => (
  <Panel>
    <Info>{`Name: ${name}`}</Info>
    <Info>{`Balance: ${balance} BUZZ`}</Info>
    <Info>{`Address: ${address}`}</Info>
  </Panel>
);

export default SMBInfo;