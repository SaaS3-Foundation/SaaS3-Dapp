import styled from 'styled-components';

export const RoundItemLink = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D2D2D2;
  border-radius: 40px;
  cursor: pointer;

  &:hover,&.active{
    border: 1px solid var(--color-primary-2);
  }

  &+&{
    margin-top: 16px;
  }
`;
