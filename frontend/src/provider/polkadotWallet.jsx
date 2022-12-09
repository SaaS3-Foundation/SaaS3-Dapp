import {
  useEffect, useState, useMemo, createContext,
} from 'react';
import { getWallets } from '@talismn/connect-wallets';
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { POLKADOT_NEDPOINT_DEFAULT } from '@/config/nerwork';

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
        const accounts = await activeWallet.getAccounts();
        activeAccount = accounts.find(({ address }) => address === activeAccount);
        console.log(activeAccount);
        setWallet(activeWallet);
        setAccount(activeAccount);
        //         const { ApiPromise, WsProvider } = require('@polkadot/api')
        // const { Keyring } = require('@polkadot/keyring')

        // Create a new instance of the API and connect to a node
        const provider = new WsProvider('wss://pc-test-3.phala.network/khala/ws');
        console.log(provider, 'provider');
        // const api = await ApiPromise.create({ provider });
        // await api.tx.balances
        //   .transfer('5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ', 123456)
        //   .signAndSend(activeAccount.address, { signer: activeAccount.signer }, (status) => {
        //     console.log(status);
        //   });
        // console.log(api.tx.balances);
        // api.
        // console.log(api, 'api');
        // // Retrieve the chain & node information information via rpc calls
        // const [chain, nodeName, nodeVersion] = await Promise.all([
        //   api.rpc.system.chain(),
        //   api.rpc.system.name(),
        //   api.rpc.system.version(),
        // ]);

        // console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
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
