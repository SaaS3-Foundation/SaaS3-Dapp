import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { EVMNETWORKS } from './network';

const _chains = Object.keys(EVMNETWORKS).map((key) => EVMNETWORKS[key].chain);

export const { chains, provider, webSocketProvider } = configureChains(
  _chains,
  [
    jsonRpcProvider({ rpc: (_chain) => ({ http: _chain.rpcUrls.default }) }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'SaaS3 Dapp',
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
