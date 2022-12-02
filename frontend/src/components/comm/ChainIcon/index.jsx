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
    background-color: var(--color-hover-gray);
    /* filter: grayscale(1); */
  }
`;

function ChainIcon(props) {
  const { chainId, iconClassName, fill = 'white' } = props;

  const IconComponent = useMemo(() => CHAINS[chainId || CHAINS_CHAINID.ETH]?.SvgComponent, [chainId]);
  return (
    <StyledWrap className={classNames(props.className)}>
      <IconComponent fill={fill} className={iconClassName} />
    </StyledWrap>
  );
}

export default ChainIcon;
