'use strict';

import React from 'react';

import {Content, Heading} from './styles';

const Panel = (props) => (
  <Content long={props.long} wide={props.wide}>
    {props.heading && <Heading>{props.heading}</Heading>}

    {props.children}

  </Content>
);

export default Panel;