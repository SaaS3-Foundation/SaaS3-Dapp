import PolkadotWalletProvider from './polkadotWallet';

function Providers(props) {
  const { children } = props;

  return (
    <PolkadotWalletProvider>
      {children}
    </PolkadotWalletProvider>
  );
}
export default Providers;
