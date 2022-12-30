import { Button } from '@douyinfe/semi-ui';
import styled from 'styled-components';

export const ProfileContentWrap = styled.div`
  background: var(--color-bg-black-opacity);
  border: 1px solid var(--color-border-white-opacity);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 26px;
  margin-top: 16px;
  margin-bottom: 56px;
`;

export const ProfileShadowBox = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
`;

export const ConfirmButton = styled(Button)`
  background: linear-gradient(267.71deg, #0348FF 0%, #1781EF 100%);
  border-radius: 40px;
  &:hover{
    background-image: none;
    background-color: #0348FF;
  }
`;

export const DeclineButton = styled(Button)`
  background: #FFFFFF;
  border: 1px solid #D2D2D2 !important;
  border-radius: 40px;
  &:hover{
    background-color: var(--semi-color-fill-0) !important;
  }
`;

export const StyledRoundBlueBox = styled.div`
  border-radius: 60px;
  border: 1px solid rgba(18, 3, 58, 0.1);
  padding: 12px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  :has(input:focus), &.active, &.is-hover:hover{
    border-color: #0047FF;
  }
`;
