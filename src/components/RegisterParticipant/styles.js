'use strict';

import styled from 'styled-components';

import {palette} from 'static/theme';

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-top: 20px;
  padding: 5px;
  font-size: 12px;
  text-align: center;
`;

export const Btn = styled.button`
  box-sizing: border-box;
  height: 40px;
  margin-top: 20px;
  padding: 0 10px;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: ${palette.dropChain};
  text-transform: uppercase;
  color: ${palette.white};
  cursor: pointer;
`;
