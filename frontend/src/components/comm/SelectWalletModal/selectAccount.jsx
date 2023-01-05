import { useContext, useEffect, useState } from 'react';
import {
  Button, Toast, Typography,
} from '@douyinfe/semi-ui';
import { Identicon } from '@polkadot/react-identicon';
import classNames from 'classnames';
import { polkadotWalletContext } from '@/provider/polkadotWallet';
import { omitText } from '@/utils/utils';
import { RoundItemLink } from './styled';

function SelectAccount(props) {
  const { wallet, onDisconnect, onSelect } = props;
  const { setWallet, setAccount, account: selectActive } = useContext(polkadotWalletContext);

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (wallet) {
      const getAccounts = async () => {
        const _accounts = await wallet.getAccounts();
        setAccounts(_accounts);
      };
      getAccounts();
    }
  }, [wallet]);

  const selectAccount = (account) => {
    setWallet(wallet);
    setAccount(account);
    localStorage.setItem('activeWallet', wallet.extensionName);
    localStorage.setItem('activeAccount', account.address);
    Toast.success('Connect wallet successfully.');
    onSelect();
  };

  return (
    <>
      {
        accounts.map((account) => {
          const isCurrentAccount = account.address === selectActive?.address;
          return (
            <RoundItemLink
              className={classNames({
                active: isCurrentAccount,
              })}
              key={account.address}
              onClick={() => selectAccount(account)}
            >
              <div onClick={(event) => event.stopPropagation()}>
                <Identicon
                  value={account.address}
                  size={36}
                  theme="polkadot"
                  onCopy={() => {
                    Toast.info('Address copied to clipboard');
                  }}
                />
              </div>
              <div className="ml-2 text-left">
                <Typography.Title heading={5}>
                  {account.name}
                </Typography.Title>
                <Typography.Text>
                  {omitText(account.address)}
                </Typography.Text>
              </div>
              <div className="ml-auto">
                {
                  isCurrentAccount && <Button theme="borderless" type="tertiary" onClick={onDisconnect}>Disconnect</Button>
                }
              </div>
            </RoundItemLink>
          );
        })
      }
    </>
  );
}

export default SelectAccount;
