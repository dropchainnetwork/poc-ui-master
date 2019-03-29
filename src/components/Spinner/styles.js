import styled, {keyframes} from "styled-components";
import { palette } from 'static/theme';

export const Wrapper = styled.div`
  position: absolute;
  top: 41%;
  left: 48%;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
`;

const StretchDelay = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
}  20% {
    transform: scaleY(1.0);
}`;

export const Rect1 = styled.div`
  background-color: ${palette.darkGray};
  height: 100%;
  margin-right: 3px;
  width: 6px;
  display: inline-block;
  
  animation: ${StretchDelay} 1.2s infinite ease-in-out;
`;

export const Rect2 = styled(Rect1)`
  animation-delay: -1.1s;
`;

export const Rect3 = styled(Rect1)`
  animation-delay: -1.0s;
`;

export const Rect4 = styled(Rect1)`
  animation-delay: -0.9s;
`;

export const Rect5 = styled(Rect1)`
  animation-delay: -0.8s;
`;
