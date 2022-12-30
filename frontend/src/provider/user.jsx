import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { useNetwork } from 'wagmi';
import { login } from '@/api/profile';
import { useUserSignMessage } from '@/hooks/signMessage';

const userInfoContext = createContext({
  userInfo: null,
  setUserInfo: () => {},
  loginUser: () => {},
});

function UserInfoProvider(props) {
  const { children } = props;
  const [userInfo, setUserInfo] = useState();

  const { address } = useUserSignMessage();
  const { chain } = useNetwork();

  const loginUser = async () => {
    try {
      const loginRet = await login(address, {
        profile: {},
        walletInfo: [{
          chain: {
            type: 0,
            name: chain.name,
            id: chain.id,
            httpProvider: chain.rpcUrls.default,
          },
          address,
        }],
      });
      if (loginRet.code === 200) {
        setUserInfo(loginRet.data);
      } else {
        throw loginRet;
      }
    } catch (error) {
      setUserInfo(null);
      Notification.error({
        title: 'fetch user info failed.',
        content: error.msg,
      });
    }
  };

  useEffect(() => {
    if (address) {
      loginUser();
    }
  }, [address, chain]);

  const value = useMemo(() => ({
    userInfo,
    setUserInfo,
    loginUser,
  }), [userInfo, setUserInfo]);

  return (
    <userInfoContext.Provider value={value}>{children}</userInfoContext.Provider>
  );
}

export {
  userInfoContext,
};

export default UserInfoProvider;
