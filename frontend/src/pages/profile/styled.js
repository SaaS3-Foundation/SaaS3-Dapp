import { Table } from '@douyinfe/semi-ui';
import styled from 'styled-components';

export const ProfileContentWrap = styled.div`
  background: rgba(0, 0, 0, 0.33);
  border: 1px solid rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 26px;
  margin-top: 16px;
  margin-bottom: 56px;
`;

export const StyledSemiTable = styled(Table)`
  .semi-table{
    border-spacing: 0 10px !important;
  }
  
  .semi-table-thead{
    th{
      font-size: 18px;
      font-weight: bold !important;
      color: white !important;
      border-bottom: 0 !important;
    }
    
  }

  .semi-table-tbody{
    >tr{
      border-radius: 60px;
      overflow: hidden;
      td{
        border-top: 1px solid rgba(255, 255, 255, 0.13);
        border-bottom: 1px solid rgba(255, 255, 255, 0.13) !important;
        &:first-child{
          margin-left: 2px;
          border-top-left-radius: 60px;
          border-bottom-left-radius: 60px;
          border-left: 1px solid rgba(255, 255, 255, 0.13);
        }
        &:last-child{
          margin-right: 2px;
          border-top-right-radius: 60px;
          border-bottom-right-radius: 60px;
          border-right: 1px solid rgba(255, 255, 255, 0.13);
        }
      }
    }
  }

`;
