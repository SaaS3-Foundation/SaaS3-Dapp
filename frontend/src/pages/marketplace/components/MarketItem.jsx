import { Button, Image, Typography } from '@douyinfe/semi-ui';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import ChainIcon from '@/components/comm/chainIcon';
import defaultItemAvatar from '@/assets/imgs/default-item-avatar.png';
import { StyledMarketItem, StyledCancelButton } from '../styled';

function MarketItem(props) {
  const { className } = props;
  const items = useMemo(() => [{
    title: 'Creator',
    rightRender: <span>Fifa Whale</span>,
  }, {
    title: 'Chain',
    rightRender: <div> <ChainIcon className="!bg-transparent" chainId={56} /> <ChainIcon className="!bg-transparent" /> </div>,
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
    <StyledMarketItem className={className}>
      <div className="header-wrap">
        <Image className="mr-2.5" width={40} height={40} src={defaultItemAvatar} preview={false} />
        <Typography.Title heading={2}>FIFA 2022</Typography.Title>
      </div>
      <div className="content-items-wrap">
        {useMemo(
          () => items.map((item, i) => (
            <div key={i}>
              <span className="font-bold">{item.title}</span>{item.rightRender}
            </div>
          )),
          [items],
        )}
      </div>
      <div className="footer-wrap">
        <StyledCancelButton theme="borderless" onClick={handleDetails} size="large">DETAILS</StyledCancelButton>
        <Button size="large" className="flex-1 bg-primary-linear">STAKE</Button>
      </div>
    </StyledMarketItem>
  );
}

export default MarketItem;
