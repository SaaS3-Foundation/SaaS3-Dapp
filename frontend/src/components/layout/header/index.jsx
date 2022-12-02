import { useMemo } from 'react';
import { IconChevronDown } from '@douyinfe/semi-icons';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '@douyinfe/semi-ui';
import { StyledNavLink, StyledNetworkBtn } from './styled';

function Header() {
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
    <header className="bg-dark-1 h-[100px] border-b border-white/[0.15] text-gray-300">
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
          <StyledNetworkBtn>
            <Typography.Text>NetWork</Typography.Text>
            <IconChevronDown className="align-middle ml-[10px] !text-[20px]" />
          </StyledNetworkBtn>
        </div>
      </div>
    </header>
  );
}

export default Header;
