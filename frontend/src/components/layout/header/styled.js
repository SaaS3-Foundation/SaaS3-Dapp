import styled from 'styled-components';

export const StyledNavLink = styled.li`
  /* w-[148px] h-[48px] leading-[48px] hover:font-[700] cursor-pointer */
  width: 148px;
  height: 48px;
  line-height: 48px;
  cursor: pointer;
  position: relative;
  
  &:hover,&.active{
    font-weight: 700;
  }
  &.active{
    &::after{
      position: absolute;
      content: '';
      width: 60px;
      display: inline-block;
      bottom: 4px;
      left: 50%;
      height: 4px;
      transform: translateX(-50%);
      background: linear-gradient(267.71deg, #2663FF 0%, #8000FF 100%);
      border-radius: 60px;
    }
  }
`;

export const StyledNetworkBtn = styled.div`
  background-color: var(--color-dark-bg-1);
  border-radius: 6px;
  margin-left: 32px;
  height: 48px;
  line-height: 48px;
  padding: 0 14px;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  >span{
    display: inline-block;
    line-height: 24px;
  }
`;
