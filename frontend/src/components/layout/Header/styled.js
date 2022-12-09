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
      background: var(--linear-primary);
      border-radius: 60px;
      animation: scale 300ms ;
      transform-origin: center;
    }
  }


  @keyframes scale {
    from {
      transform: translateX(-50%) scaleX(0);
    }
    to{
      transform: translateX(-50%) scaleX(1);
    }
  }
`;

export const StyledRoundButton = styled.button`
  border-radius: 20px;
  padding: 10px 24px;
  background: var(--color-bg-black-opacity);
  border: 1px solid var(--color-border-white-opacity);
  &:hover{
    background-color: var(--color-border-white-opacity);
  }
`;
