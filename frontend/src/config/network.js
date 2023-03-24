import { khala } from '@phala/typedefs';
import {
  mainnet, bsc, okc, moonbaseAlpha,
} from '@wagmi/core/chains';
import moonbaseIcon from '@/assets/imgs/icon/moonbase.png';
import okexIcon from '@/assets/imgs/icon/okex.webp';
import { ReactComponent as Bsc } from '@/assets/imgs/svg/Icon/BAN.svg';
import { ReactComponent as Eth } from '@/assets/imgs/svg/Icon/Ethereum.svg';

export const POLKADOT_NETWORK_NODES = [
  // {
  //   id: 'phala-via-phala',
  //   name: 'Phala Mainnet',
  //   endpoint: 'wss://api.phala.network/ws',
  //   types: khala,
  //   kind: 'phala',
  // },
  // {
  //   id: 'khala-via-phala',
  //   name: 'Khala via Phala',
  //   endpoint: 'wss://khala-api.phala.network/ws',
  //   types: khala,
  //   kind: 'khala',
  // },
  // {
  //   id: 'khala-via-onfinality',
  //   name: 'Khala via Onfinality',
  //   endpoint: 'wss://khala.api.onfinality.io/public-ws',
  //   types: khala,
  //   kind: 'khala',
  // },
  // {
  //   id: 'khala-via-dwellir',
  //   name: 'Khala via Dwellir',
  //   endpoint: 'wss://khala-rpc.dwellir.com',
  //   types: khala,
  //   kind: 'khala',
  // },
  {
    id: 'Phala Testnet',
    name: 'Phala Testnet',
    endpoint: 'wss://poc5.phala.network/ws',
    pruntime: 'https://poc5.phala.network/tee-api-1',
    types: khala,
    kind: 'test',
  },
  {
    id: 'Phala PreAlpha',
    name: 'Phala PreAlpha',
    endpoint: 'ws://localhost:19944',
    // pruntime: 'https://poc5.phala.network/tee-api-1',
    // types: khala,
    kind: 'test',
  },
];

export const POLKADOT_ENDPOINT_DEFAULT = 'wss://poc5.phala.network/ws';

export const POLKADOT_PRUNTIME_URL_DEFAULT = 'https://poc5.phala.network/tee-api-1';

export const EVM_CHAINID = {
  ETH: 1,
  BSC: 56,
  OKX: 66,
  MOONBASEALPHA: 1287,
};

moonbaseAlpha.iconUrl = moonbaseIcon;
okc.iconUrl = okexIcon;

export const EVMNETWORKS = {
  [EVM_CHAINID.ETH]: {
    name: 'ethereum',
    SvgComponent: Eth,
    chain: mainnet,
  },
  [EVM_CHAINID.BSC]: {
    name: 'BSC Mainnet',
    SvgComponent: Bsc,
    chain: bsc,
  },
  [EVM_CHAINID.OKX]: {
    name: 'OKExChain Mainnet',
    SvgComponent: Bsc,
    chain: okc,
  },
  [EVM_CHAINID.MOONBASEALPHA]: {
    name: 'Moonbase Alpha',
    SvgComponent: Bsc,
    chain: moonbaseAlpha,
  },
};
