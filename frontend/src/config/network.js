import { khala } from '@phala/typedefs';
import {
  mainnet, bsc, okc, moonbaseAlpha,
} from '@wagmi/core/chains';
import moonbaseIcon from '@/assets/imgs/icon/moonbase.png';
import okexIcon from '@/assets/imgs/icon/okex.webp';
import mapoIcon from '@/assets/imgs/icon/mapo.webp';
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
  MAPO_Mainnet: 22776,
  MAPO_TEST: 212,
};

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
    chain: {
      ...okc,
      iconUrl: okexIcon,
      iconBackground: '#fff',
    },
  },
  [EVM_CHAINID.MOONBASEALPHA]: {
    name: 'Moonbase Alpha',
    SvgComponent: Bsc,
    chain: {
      iconUrl: moonbaseIcon,
      ...moonbaseAlpha,
    },
  },
  [EVM_CHAINID.MAPO_Mainnet]: {
    name: 'MAPO Mainnet',
    SvgComponent: Bsc,
    chain: {
      iconUrl: mapoIcon,
      id: EVM_CHAINID.MAPO_Mainnet,
      name: 'MAPO Mainnet',
      network: 'mapo-mainnet',
      nativeCurrency: {
        decimals: 18,
        name: 'MAPO',
        symbol: 'MAPO',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.maplabs.io'],
        },
        public: {
          http: ['https://rpc.maplabs.io'],
        },
      },
      blockExplorers: {
        default: {
          name: 'MAPO Mainnet Explorer',
          url: 'https://makalu.mapscan.io',
        },
      },
    },
  },
  [EVM_CHAINID.MAPO_TEST]: {
    name: 'MAPO Makalu Testnet',
    SvgComponent: Bsc,
    chain: {
      iconUrl: mapoIcon,
      id: EVM_CHAINID.MAPO_TEST,
      name: 'MAPO Testnet',
      network: 'mapo-testnet',
      nativeCurrency: {
        decimals: 18,
        name: 'MAPO',
        symbol: 'MAPO',
      },
      rpcUrls: {
        default: {
          http: ['https://testnet-rpc.maplabs.io'],
        },
        public: {
          http: ['https://testnet-rpc.maplabs.io'],
        },
      },
      blockExplorers: {
        default: {
          name: 'MAPO testnet Explorer',
          url: 'https://testnet.maposcan.io',
        },
      },
    },
  },
};
