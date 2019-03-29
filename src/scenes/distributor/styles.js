'use strict';

import styled from 'styled-components';
import {palette} from '../../static/theme';

export const DistributorDashboard = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 50px;
  overflow: scroll;
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

export const List = styled.ul`
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  padding: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid white;
  list-style: none;
  overflow-y: scroll;
`;

export const ListItem = styled.li`
  width: 100%;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  color: ${palette.darkGray};
  text-align: center;
`;

export const Info = styled.p`
  margin-top: 40px;
  margin-bottom: 0;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  color: ${palette.darkGray};
`;

export const SelectableUnit = styled.li`
  width: 100%;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  background-color: ${(props) => props.selected ? palette.dropChain : 'transparent'};
  color: ${(props) => props.selected ? palette.white : palette.darkGray};
  text-align: center;
  cursor: pointer;
  
  &:hover {
    background-color: ${palette.lightGray};
    color: ${palette.dropChain};
  }
`;