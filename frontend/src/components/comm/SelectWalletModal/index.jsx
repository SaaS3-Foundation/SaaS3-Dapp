import {
  forwardRef,
  useState,
  useContext,
  useEffect,
} from 'react';
import RefSemiModal from '../RefSemiModal';
import SelectWallet from './selectWallet';
import SelectAccount from './selectAccount';
import { polkadotWalletContext } from '@/provider/polkadotWallet';

function SelectWalletModal(props, ref) {
  const { setWallet, setAccount, wallet } = useContext(polkadotWalletContext);
  const [activeWallet, setActiveWallet] = useState();

  useEffect(() => {
    setActiveWallet(wallet);
  }, [wallet]);

  return (
    <RefSemiModal
      ref={ref}
      {...props}
      style={{
        '--semi-color-fill-0': 'rgba(0,0,0, 0.1)',
        '--semi-color-bg-2': 'white',
        '--semi-color-text-0': 'black',
        '--semi-color-text-1': 'black',
      }}
      title={<span className="text-2xl ml-[140px]">Select {activeWallet || wallet ? 'Account' : 'Wallet'}</span>}
      footer={null}
      onCancel={() => {
        setTimeout(() => {
          setActiveWallet(null);
        }, 300);
      }}
    >
      <div className="mb-5">
        {
          activeWallet || wallet ? (
            <SelectAccount
              wallet={activeWallet || wallet}
              onDisconnect={(event) => {
                event.stopPropagation();
                setActiveWallet(null);
                setWallet(null);
                setAccount(null);
                localStorage.removeItem('activeWallet');
                localStorage.removeItem('activeAccount');
              }}
              onSelect={() => ref.current.close()}
            />
          ) : <SelectWallet onSelect={setActiveWallet} />
        }
      </div>
    </RefSemiModal>
  );
}

export default forwardRef(SelectWalletModal);
