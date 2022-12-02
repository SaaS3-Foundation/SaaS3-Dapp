import { chain } from 'wagmi';
import { ReactComponent as Bsc } from '@/assets/imgs/svg/Icon/BAN.svg';
import { ReactComponent as Eth } from '@/assets/imgs/svg/Icon/Ethereum.svg';

export const CHAINS_CHAINID = {
  ETH: 1,
  BSC: 56,
};

export const CHAINS = {
  [CHAINS_CHAINID.ETH]: {
    name: 'ethereum',
    SvgComponent: Eth,
    chain: chain.mainnet,
  },
  [CHAINS_CHAINID.BSC]: {
    name: 'ethereum',
    SvgComponent: Bsc,
    // chain: chain
  },
};
