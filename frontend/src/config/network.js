import { khala } from '@phala/typedefs';
import { chain } from 'wagmi';
import bscIcon from '@/assets/imgs/icon/bsc.png';
import { ReactComponent as Bsc } from '@/assets/imgs/svg/Icon/BAN.svg';
import { ReactComponent as Eth } from '@/assets/imgs/svg/Icon/Ethereum.svg';

export const POLKADOT_NETWORK_NODES = [
  {
    id: 'phala-via-phala',
    name: 'Phala Mainnet',
    endpoint: 'wss://api.phala.network/ws',
    types: khala,
    kind: 'phala',
  },
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
  (import.meta.env.MODE === 'development')
    && ({
      id: 'pc-test-3',
      name: 'Phala Testnet',
      endpoint: 'wss://pc-test-3.phala.network/khala/ws',
      types: khala,
      kind: 'test',
    }),
].filter((node) => node !== false);

export const POLKADOT_ENDPOINT_DEFAULT = 'wss://poc5.phala.network/ws';

export const POLKADOT_PRUNTIME_URL_DEFAULT = 'https://poc5.phala.network/tee-api-1';

export const EVM_CHAINID = {
  ETH: 1,
  BSC: 56,
};

export const EVMNETWORKS = {
  [EVM_CHAINID.ETH]: {
    name: 'ethereum',
    SvgComponent: Eth,
    chain: chain.mainnet,
  },
  [EVM_CHAINID.BSC]: {
    name: 'BSC Mainnet',
    SvgComponent: Bsc,
    chain: {
      iconUrl: bscIcon,
      iconBackground: '#fff',
      id: 56,
      blockExplorers: {
        default: {
          name: 'BSCscan',
          url: 'https://bscscan.com',
        },
      },
      // ens: { address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
      multicall: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 14353601,
      },
      nativeCurrency: {
        decimals: 18,
        name: 'BNB',
        symbol: 'BNB',
      },
      rpcUrls: {
        default: 'https://bsc.mytokenpocket.vip',
      },
      name: 'BSC Mainnet',
    },
  },
};

console.log(EVMNETWORKS);
