import {
  useEffect, useState, useMemo, createContext,
} from 'react';
import { getWallets } from '@talismn/connect-wallets';

const polkadotWalletContext = createContext({
  wallet: null,
  account: null,
  setWallet: () => {},
  setAccount: () => {},
});

function PolkadotWalletProvider(props) {
  const { children } = props;
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);

  const value = useMemo(() => ({
    wallet,
    account,
    setWallet,
    setAccount,
  }), [wallet, account, setAccount, setWallet]);

  useEffect(() => {
    const setActive = async () => {
      let activeWallet = localStorage.getItem('activeWallet');
      let activeAccount = localStorage.getItem('activeAccount');
      if (activeWallet) {
        const wallets = await getWallets();
        activeWallet = wallets.find(({ extensionName }) => extensionName === activeWallet);
        await activeWallet.enable('SaaS3 Dapp');
        setWallet(activeWallet);
        const accounts = await activeWallet.getAccounts();
        activeAccount = accounts.find(({ address }) => address === activeAccount);
        setAccount(activeAccount);
      }
    };
    setActive();
  }, []);

  return (
    <polkadotWalletContext.Provider value={value}>
      {children}
    </polkadotWalletContext.Provider>
  );
}

export {
  polkadotWalletContext,
};

export default PolkadotWalletProvider;
