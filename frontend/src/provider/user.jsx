import {
  createContext, useMemo,
} from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useUserSignMessage } from '@/hooks/signMessage';
import { useLogin } from '@/hooks/api/user';

const userInfoContext = createContext({
  userInfo: {
    name: '',
    description: '',
    email: '',
    twitter: '',
    github: '',
    telegram: '',
  },
  error: null,
  mutate: () => {},
  isLoading: false,
});

function UserInfoProvider(props) {
  const { children } = props;
  const { address } = useUserSignMessage();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const {
    data, error, isLoading, mutate,
  } = useLogin(isConnected && chain ? address : null, {
    wallets: [{
      chain: { chainId: chain.id },
      address,
    }],
  });

  const value = useMemo(() => ({
    userInfo: data,
    isLoading,
    error,
    mutate,
  }), [data, error, isLoading, mutate]);

  return (
    <userInfoContext.Provider value={value}>{children}</userInfoContext.Provider>
  );
}

export {
  userInfoContext,
};

export default UserInfoProvider;
