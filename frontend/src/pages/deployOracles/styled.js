import styled from 'styled-components';

export const StyledPanel = styled.div`
  background: var(--color-bg-black-opacity);
  border: 1px solid var(--color-border-white-opacity);
  backdrop-filter: blur(5px);
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  &:hover{
    background-color: var(--color-border-white-opacity);
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
  background: var(--color-bg-black-opacity);
  border: 1px solid var(--color-border-white-opacity);
  backdrop-filter: blur(5px);

  >.header{
    display: flex;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid var(--color-border-white-opacity);
    >.semi-icon{
      margin-left: auto;
    }
  }
  /* .border{
    border: 1px solid var(--color-border-white-opacity) !important;
  } */
  .round{
    border-radius: 20px;
  }
  .semi-button{
    border: 1px solid var(--color-border-white-opacity);
    border-radius: 60px;
    &:hover{
      border-width: 1px;
    }
  }
  .semi-input-wrapper{
    border-radius: 12px;
  }
  &:hover{
    background-color: rgb(255 255 255 / 10%);
  }
`;
