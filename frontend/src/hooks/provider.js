import { useContext } from 'react';
import { polkadotWalletContext } from '@/provider/polkadotWallet';
import { userInfoContext } from '@/provider/user';

export const usePolkadotWallet = () => useContext(polkadotWalletContext);

export const useUserInfo = () => useContext(userInfoContext);
