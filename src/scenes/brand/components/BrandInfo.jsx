'use strict';

import React from 'react';

import Panel from 'components/Panel';
import {Btn, Info} from '../styles';

const BrandInfo = ({brandName, balance, address, approved, approve}) => (
  <Panel>
    <Info>{`Name: ${brandName}`}</Info>
    <Info>{`Address: ${address}`}</Info>
    <Info>{`Balance: ${balance / Math.pow(10, 18)} BUZZ`}</Info>
    <Info>{`Approved: ${approved / Math.pow(10, 18)} BUZZ`}</Info>
    {balance !== approved ? <Btn onClick={approve}>Approve</Btn> : <div/>}
  </Panel>
);

export default BrandInfo;