import { useMemo } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
// import { ReactComponent as BscIcon } from '@/assets/imgs/svg/Icon/BAN.svg';
// import { ReactComponent as EthIcon } from '@/assets/imgs/svg/Icon/Ethereum.svg';
import { CHAINS, CHAINS_CHAINID } from '@/config/chain';

// const CHAIN_ICON = {
//   bsc: BscIcon,
//   eth: EthIcon,
// };

const StyledWrap = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-dark-bg-1);
  cursor: pointer;
  &:hover{
    filter: grayscale(1);
    /* opacity: 0.8; */
    /* background-color: var(--color-dark-bg-1); */
  }
`;

function ChainIcon(props) {
  const { chainId = CHAINS_CHAINID.ETH } = props;

  const IconComponent = useMemo(() => CHAINS[chainId]?.SvgComponent, [chainId]);
  return (
    <StyledWrap className={classNames(props.className)}>
      <IconComponent fill="white" {...props} className={props.iconClassName} />
    </StyledWrap>
  );
}

export default ChainIcon;
