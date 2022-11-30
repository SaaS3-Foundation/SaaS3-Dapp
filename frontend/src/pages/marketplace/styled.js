import { Collapse } from '@douyinfe/semi-ui';
import styled from 'styled-components';

export const StyledMarketItem = styled.div`
  padding: 20px 24px;
  border-radius: 12px;
  background: rgba(66, 54, 142, 0.33);
  backdrop-filter: blur(5px);
  >h1{
    font-weight: bold;
    font-size: 27px;
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
      margin-top: 10px;
      display: flex;
      align-items: center;
      >.semi-button{
        border-radius: 6px;
        &:first-child{
          background: linear-gradient(267.71deg, #2663FF 0%, #8000FF 100%);
        }
        &:last-child{
          background-color: var(--color-cancel);
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

export const StyledCharWrap = styled.div`
  background: var(--color-dark-bg-2);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 16px 28px;
  >.header{
    >h1{
      font-size: 18px;
      font-weight: bold;
    }
    display: flex;
    align-items: center;
  }
`;

export const StyledCollapse = styled(Collapse)`
  .semi-collapse-item{
    border-bottom: 0;
    background-color: var(--color-dark-bg-1);
    border: 2px solid transparent;
    border-radius: 6px;
    .semi-collapse-header{
      margin: 0;
    }
    &+.semi-collapse-item{
      margin-top: 12px;
    }
    &:has(.semi-collapse-header[aria-expanded=true]){
      border-color: var(--color-primary);
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
