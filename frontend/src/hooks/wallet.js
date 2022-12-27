import { useContext } from 'react';
import { polkadotWalletContext } from '@/provider/polkadotWallet';

export const usePolkadotWallet = () => useContext(polkadotWalletContext);
