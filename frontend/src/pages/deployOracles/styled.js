import styled from 'styled-components';

export const StyledPanel = styled.div`
  background: rgba(0, 0, 0, 0.33);
  border: 1px solid rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(5px);
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  &:hover{
    background: rgba(255 255 255 / 0.1);
  }
  >span{
    margin-top: 24px;
    font-weight: bold;
  }
`;

export const DeployWrap = styled.div`
  margin-top: 16px;
  margin-bottom: 52px;
  padding: 20px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.33);
  border: 1px solid rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(5px);

  >.header{
    display: flex;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.13);
    >.semi-icon{
      margin-left: auto;
    }
  }
  .tabs{
    display: flex;
    >.tab-panel{
      padding: 6px 24px;
      cursor: pointer;
      position: relative;
      &.active{
        font-weight: bold;
      }
      &.active,&:hover{
        &::after{
          content: '';
          position: absolute;
          height: 2px;
          width: 36px;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          background-image: var(--linear-primary);
        }
      }
    }
  }
  .border{
    border: 1px solid rgba(255, 255, 255, 0.13) !important;
  }
  .round{
    border-radius: 20px;
  }
  .semi-button{
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 60px;
  }
`;
