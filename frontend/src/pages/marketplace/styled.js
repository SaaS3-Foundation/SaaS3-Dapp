import { Button, Collapse } from '@douyinfe/semi-ui';
import styled from 'styled-components';

export const StyledSearchWrap = styled.div`
  width: 610px;
  padding: 0 16px;
  background-color: var(--color-bg-black-opacity);
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid var(--color-border-white-opacity);
  &:has(input:focus){
    border-color: var(--color-primary-2);
  }
`;

export const StyledMarketItem = styled.div`
  padding: 20px 24px;
  border-radius: 12px;
  background: var(--color-bg-black-opacity);
  border: 1px solid var(--color-border-white-opacity);
  backdrop-filter: blur(5px);
  >.header-wrap{
    display: flex;
    align-items: center;
  }
  >div{
    &.content-items-wrap{
      margin-top: 10px;
      >div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 2.2;
        font-size: 14px;
      }
    }
    &.footer-wrap{
      margin-top: 12px;
      display: flex;
      align-items: center;
      >.semi-button{
        border-radius: 60px;
        &:last-child{
          margin-left: 10px;
        }
        &:hover{
          opacity: 0.8;
        }
      }
      .semi-button-content{
        color: white;
      }
    }
  }
`;

export const StyledCancelButton = styled(Button)`
  border-radius: 60px;
  background: linear-gradient(263.17deg, rgba(104, 104, 104, 0.33) 6.45%, rgba(97, 97, 97, 0.33) 100%);
  .semi-button-content{
    color: white;
  }
`;

export const StyledChartsWrap = styled.div`
  background: var(--color-bg-black-opacity);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 16px 28px;
  border: 1px solid var(--color-border-white-opacity);

  >.header{
    >h1{
      font-size: 18px;
      font-weight: bold;
    }
    display: flex;
    align-items: center;
  }
  
  canvas {
    border-radius: 6px;
  }
`;

export const StyledCollapse = styled(Collapse)`
  
  .semi-collapse-item{
    border-bottom: 0;
    background-color: var(--color-bg-black-opacity);
    border: 1px solid var(--color-border-white-opacity);
    border-radius: 20px;
    overflow: hidden;
    .semi-collapse-header{
      margin: 0;
    }
    &+.semi-collapse-item{
      margin-top: 12px;
    }
  }
`;

export const StyledAddressItem = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-dark-bg-1);
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  >span{
    &:first-child{
      flex: 1;
      margin-right: 4px;
    }
    &.semi-icon{
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
  }
  &+&{
    margin-top: 12px;
  }
`;
