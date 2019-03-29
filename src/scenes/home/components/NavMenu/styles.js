'use strict';

import styled from 'styled-components';
import {palette} from 'static/theme';
import logo from 'static/images/dropchain-logo.png';

export const Navigation = styled.aside`
    width: 10%; 
    height: 100%;
    background-color: ${palette.dropChain};
`;

export const Button = styled.button`
    width: 100%;
    height: 100px;
    border: none;
    outline: none;
    background-color: ${(props) => props.active ? palette.veryLightGray : 'transparent'};
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => props.active ? palette.dropChain : palette.white};
    cursor: pointer;
    
    &:hover {
      background-color: ${palette.lightGray};
      color: ${palette.dropChain}
    }
`;

export const Logo = styled.div`
  width: 100%;
  height: 80px;
  background-image: url(${logo});
  background-size: 80% 50px;
  background-repeat: no-repeat;
  background-position: center center;
`;