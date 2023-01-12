import {
  createContext, useEffect, useMemo,
} from 'react';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { Notification } from '@douyinfe/semi-ui';
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
  isLogin: false,
});

function UserInfoProvider(props) {
  const { children } = props;
  const { address, signMessage } = useUserSignMessage();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const {
    data, error, isLoading, mutate,
  } = useLogin(isConnected && signMessage && chain ? address : null, {
    wallets: [{
      chain: { chainId: chain?.id },
      address,
    }],
  });

  useEffect(() => {
    if (error && isConnected) {
      Notification.error({
        title: 'User login failed',
        content: error.msg || 'Please try reconnect wallet again.',
      });
      disconnect();
    }
  }, [error]);

  const value = useMemo(() => ({
    userInfo: data,
    isLoading,
    error,
    mutate,
    isLogin: isConnected && data?.id,
  }), [data, error, isLoading, mutate]);

  return (
    <userInfoContext.Provider value={value}>{children}</userInfoContext.Provider>
  );
}

export {
  userInfoContext,
};

export default UserInfoProvider;
