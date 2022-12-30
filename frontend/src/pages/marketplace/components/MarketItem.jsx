import { Button, Image, Typography } from '@douyinfe/semi-ui';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import ChainIcon from '@/components/comm/ChainIcon';
import defaultItemAvatar from '@/assets/imgs/default-item-avatar.png';
import { StyledMarketItem, StyledCancelButton } from '../styled';

function MarketItem(props) {
  const { className, data } = props;

  const items = useMemo(() => [{
    title: 'Creator',
    rightRender: <Typography.Text>{data.creator.profile.name}</Typography.Text>,
  }, {
    title: 'Chain',
    rightRender: <div> <ChainIcon className="!cursor-default !bg-transparent" chainId={data.oracleInfo.targetChain.id} /></div>,
  }, {
    title: 'Creator Stake($SaaS)',
    rightRender: <span>--</span>,
  }, {
    title: 'Stake Pool($SaaS)',
    rightRender: <span>--</span>,
  }, {
    title: 'ARP',
    rightRender: <span>--</span>,
  }, {
    title: 'Called',
    rightRender: <span>--</span>,
  }, {
    title: 'Accuracy',
    rightRender: <span>--</span>,
  }, {
    title: 'Price Per Call($SaaS)',
    rightRender: <span>--</span>,
  }], []);
  const nav = useNavigate();

  const handleDetails = () => {
    nav(`details/${data.id}`);
  };

  return (
    <StyledMarketItem className={className}>
      <div className="header-wrap">
        <Image className="flex-shrink-0 mr-2.5" width={40} height={40} src={defaultItemAvatar} preview={false} />
        <Typography.Title
          ellipsis={{
            rows: 1,
          }}
          heading={3}
        >
          {data.oracleInfo.title}
        </Typography.Title>
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
