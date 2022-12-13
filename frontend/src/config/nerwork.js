import { khala } from '@phala/typedefs';

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
