import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { Notification } from '@douyinfe/semi-ui';
import { detail, register } from '@/api/profile';

export function useUserInfo() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [userInfo, setUserInfo] = useState(null);

  const registerUser = async () => {
    try {
      const registerRet = await register(address, {
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
      if (registerRet.code === 200) {
        setUserInfo(registerRet.data);
      } else {
        Notification.error({
          title: 'register failed.',
          content: registerRet.msg,
        });
      }
    } catch (error) {
      Notification.error({
        title: 'fetch user info failed.',
        content: error.msg,
      });
    }
  };

  const getUserInfo = async () => {
    try {
      const detailRet = await detail(address);
      if (detailRet.code === 200) {
        setUserInfo(detailRet.data);
      } else if (detailRet.code === 404) {
        registerUser();
      }
    } catch (error) {
      Notification.error({
        title: 'fetch user info failed.',
        content: error.msg,
      });
    }
  };

  useEffect(() => {
    if (address) {
      getUserInfo();
    }
  }, [address, chain]);

  return { userInfo, updateUserInfo: getUserInfo };
}
