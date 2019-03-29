'use strict';

import React from 'react';
import {observer} from 'mobx-react';

import Panel from '../Panel';
import {Input, Btn} from './styles';

const RegisterParticipant = observer(({participant, name, changeName, register}) => (
  <Panel heading={`Register your ${participant}`}>
    <Input
      type="text"
      placeholder={`Enter your ${participant} name`}
      value={name}
      onChange={changeName}
    />
    <Btn onClick={register}>register</Btn>
  </Panel>
));

export default RegisterParticipant;