import { Button } from '@douyinfe/semi-ui';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { StyledMarketItem } from './styled';

function MarketItem() {
  const items = useMemo(() => [{
    title: 'Creator',
    rightRender: <span>Fifa Whale</span>,
  }, {
    title: 'Chain',
    rightRender: <span>Fifa Whale</span>,
  }, {
    title: 'Creator Stake($SaaS)',
    rightRender: <span>Fifa Whale</span>,
  }, {
    title: 'Stake Pool($SaaS)',
    rightRender: <span>Fifa Whale</span>,
  }, {
    title: 'ARP',
    rightRender: <span>Fifa Whale</span>,
  }, {
    title: 'Called',
    rightRender: <span>Fifa Whale</span>,
  }, {
    title: 'Accuracy',
    rightRender: <span>Fifa Whale</span>,
  }, {
    title: 'Price Per Call($SaaS)',
    rightRender: <span>Fifa Whale</span>,
  }], []);
  const nav = useNavigate();

  const handleDetails = () => {
    nav('details/id');
  };

  return (
    <StyledMarketItem>
      <h1>FIFA 2022</h1>
      <div className="content-items-wrap">
        {useMemo(() => items.map((item, i) => <div key={i}><span>{item.title}</span>{item.rightRender}</div>), [items])}
      </div>
      <div className="footer-wrap">
        <Button size="large" className="flex-1">STAKE</Button>
        <Button onClick={handleDetails} size="large" className="ml-2.5">DETAILS</Button>
      </div>
    </StyledMarketItem>
  );
}

export default MarketItem;
