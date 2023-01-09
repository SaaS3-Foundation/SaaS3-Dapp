import { useMemo } from 'react';
import { IconChevronDown } from '@douyinfe/semi-icons';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '@douyinfe/semi-ui';
import classNames from 'classnames';
import { useNetwork } from 'wagmi';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { StyledNavLink } from './styled';
import ConnectButton from '@/components/custom/ConnectButton';
import { StyledRoundButton } from '@/components/styled/button';

function Header() {
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();
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
    <header
      className="bg-black/10 nmd:h-[100px] border-b border-white/[0.15] text-gray-300 xmd:py-4"
      style={
        { backdropFilter: 'blur(5px)' }
      }
    >
      <div className="h-full flex items-center container mx-auto">
        <div className="w-[150px] nmd:flex-shrink-0 mr-2 xmd:flex-1 xmd:max-w-[150px]">
          <a href="https://saas3.io" className="w-full">
            <img className="w-full" src="https://www.saas3.io/file/logo/logo-text-white.png" alt="saas-logo" />
          </a>
        </div>

        <div className="ml-auto flex nmd:flex-wrap">
          <ul className="flex-1 flex items-center text-white text-center xmd:hidden">
            {useMemo(
              () => navs.map((nav) => (
                <StyledNavLink key={nav.text} className={nav.href === location.pathname ? 'active' : ''}>
                  <Link className="block w-full h-full" to={nav.href}>{nav.text}</Link>
                </StyledNavLink>
              )),
              [],
            )}
          </ul>

          {chain?.name && (
            <StyledRoundButton className="whitespace-nowrap" onClick={openChainModal}>
              <Typography.Text>{chain.name}</Typography.Text>
              <IconChevronDown className="align-middle ml-[10px] !text-[20px]" />
            </StyledRoundButton>
          )}
          <ConnectButton className="ml-3" />
        </div>
      </div>
      <ul className="flex justify-center pt-2 nmd:hidden items-center text-white text-center">
        {useMemo(
          () => navs.map((nav) => (
            <StyledNavLink
              key={nav.text}
              className={classNames('!w-auto flex-1', {
                active: nav.href === location.pathname,
              })}
            >
              <Link className="block w-full h-full" to={nav.href}>{nav.text}</Link>
            </StyledNavLink>
          )),
          [],
        )}
      </ul>
    </header>
  );
}

export default Header;
