import PolkadotWalletProvider from './polkadotWallet';
import UserInfoProvider from './user';

function Providers(props) {
  const { children } = props;

  return (
    <PolkadotWalletProvider>
      <UserInfoProvider>
        {children}
      </UserInfoProvider>
    </PolkadotWalletProvider>
  );
}
export default Providers;
