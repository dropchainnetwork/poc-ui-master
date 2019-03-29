'use strict';

import styled from 'styled-components';

import {palette} from 'static/theme';

export const Content = styled.article`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${(props) => props.wide ? '550px' : '350px'};
  height: ${(props) => props.long ? '520px': '420px'};
  margin: 0px 25px 100px;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  background-color: ${palette.white};
`;

export const Heading = styled.h3`
  font-size: 18px;
  text-align: center;
  color: ${palette.dropChain};
`;