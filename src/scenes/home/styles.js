'use strict';

import styled from 'styled-components';

import { palette } from 'static/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${palette.veryLightGray};
  font-size: 14px;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  width: 90%;
  height: 100%;
`;