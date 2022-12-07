import { useContext, useMemo, useRef } from 'react';
import { IconChevronDown } from '@douyinfe/semi-icons';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '@douyinfe/semi-ui';
import { StyledNavLink, StyledRoundButton } from './styled';
import SelectWalletModal from '@/components/comm/selectWalletModal';
import { formatAddress } from '@/utils/address';
import { polkadotWalletContext } from '@/provider/polkadotWallet';

function Header() {
  const { account } = useContext(polkadotWalletContext);
  const selectWalletModalRef = useRef();
  const location = useLocation();
  const navs = [{
    text: 'Marketplace',
    href: '/marketplace',
  }, {
    text: 'Deploy Oracles',
    href: '/deploy-oracles-panels',
  }, {
    text: 'Profile',
    href: '/profile',
  }];

  return (
    <>
      <header
        className="bg-black/10 h-[100px] border-b border-white/[0.15] text-gray-300"
        style={
          { backdropFilter: 'blur(5px)' }
        }
      >
        <div className="h-full flex items-center container mx-auto">
          <div className="w-[150px] flex-shrink-0">
            <a href="https://saas3.io" className="w-full">
              <img className="w-full" src="https://www.saas3.io/file/logo/logo-text-white.png" alt="saas-logo" />
            </a>
          </div>

          <div className="ml-auto flex">
            <ul className="flex-1 flex items-center text-white gap text-center">
              {useMemo(
                () => navs.map((nav) => (
                  <StyledNavLink key={nav.text} className={nav.href === location.pathname ? 'active' : ''}>
                    <Link className="block w-full h-full" to={nav.href}>{nav.text}</Link>
                  </StyledNavLink>
                )),
                [],
              )}
            </ul>
            <StyledRoundButton>
              <Typography.Text>NetWork</Typography.Text>
              <IconChevronDown className="align-middle ml-[10px] !text-[20px]" />
            </StyledRoundButton>

            <StyledRoundButton className="ml-3" onClick={() => selectWalletModalRef.current.open()}>
              <Typography.Text>{account?.address ? formatAddress(account?.address) : 'Connect Wallet'}</Typography.Text>
            </StyledRoundButton>
          </div>
        </div>
      </header>
      <SelectWalletModal ref={selectWalletModalRef} />
    </>
  );
}

export default Header;
