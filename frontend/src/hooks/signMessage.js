import { useEffect, useState } from 'react';
import {
  useAccount, useDisconnect, useNetwork, useSignMessage,
} from 'wagmi';
import { decodeTemplate, guid, verifyMessage } from '@/utils/utils';
import { SIGN_MESSAGE } from '@/config/message';

export const useUserSignMessage = () => {
  const { address, isConnected, connector } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const [nonce, setNonce] = useState();
  const [signMessage, setSignMessage] = useState();

  useEffect(() => {
    if (address && isConnected && connector) {
      let __uuid = localStorage.getItem('__nonce');
      const __userSign = localStorage.getItem('__userSign');
      if (verifyMessage(address, __uuid, __userSign)) {
        setNonce(__uuid);
        setSignMessage(__userSign);
        return;
      }
      __uuid = guid();
      localStorage.setItem('__address', address);
      localStorage.setItem('__nonce', __uuid);
      const message = decodeTemplate(SIGN_MESSAGE, { address, nonce: __uuid });

      signMessageAsync({ message }).then((sign) => {
        setNonce(__uuid);
        setSignMessage(sign);
        localStorage.setItem('__userSign', sign);
      }).catch(() => {
        disconnect();
      });
    }
  }, [address, isConnected, connector]);

  useEffect(() => {
    if (chain?.unsupported) {
      disconnect();
    }
  }, [chain]);

  return {
    address,
    signMessage,
    nonce,
  };
};
