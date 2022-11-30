import { useMemo } from 'react';
import { IconChevronDown } from '@douyinfe/semi-icons';
import { StyledNavLink, StyledNetworkBtn } from './styled';

function Header() {
  const navs = [{
    text: 'Marketplace',
  }, {
    text: 'Deploy Oracles',
  }, {
    text: 'Profile',
  }];

  return (
    <header className="bg-dark-1 h-[100px]">
      <div className="h-full flex items-center container mx-auto">
        <div className="w-[150px] flex-shrink-0">
          <img className="w-full" src="https://www.saas3.io/file/logo/logo-text-white.png" alt="saas-logo" />
        </div>

        <div className="ml-auto flex">
          <ul className="flex-1 flex items-center text-white gap text-center">
            {useMemo(
              () => navs.map((nav) => <StyledNavLink key={nav.text} className={nav.text === 'Marketplace' ? 'active' : ''}>{nav.text}</StyledNavLink>),
              [],
            )}
          </ul>
          <StyledNetworkBtn>
            <span>NetWork</span>
            <IconChevronDown className="align-middle ml-[10px] !text-[20px]" />
          </StyledNetworkBtn>
        </div>
      </div>
    </header>
  );
}

export default Header;
