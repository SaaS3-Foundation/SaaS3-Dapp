import { Button, Typography } from '@douyinfe/semi-ui';
import { IconCopy } from '@douyinfe/semi-icons';
import { CHAINS } from '@/config/chain';

export const WALLET_INFORMATION_COLUMNS = [
  {
    title: 'Wallet Address',
    width: '600px',
    render: (text, row, index) => (
      <Typography.Text
        style={{ '--semi-color-link': 'white' }}
      >
        {index + 1}. {row.address}  <IconCopy className="ml-6 cursor-pointer hover:text-gray-400 align-text-bottom" />
      </Typography.Text>
    ),
  },
  {
    title: 'Chains',
    dataIndex: 'chains',
    render: () => {
      const icons = Object.keys(CHAINS).map((key) => {
        const Icon = CHAINS[key].SvgComponent;
        return <Icon fill="white" key={key} />;
      });
      return (
        <div className="flex gap-3">
          {icons}
        </div>
      );
    },
  },
];

export const STAKE_INFORMATION_COLUMNS = [
  {
    title: 'ORACLE',
    dataIndex: 'oracle',
  }, {
    title: 'CREATOR',
    dataIndex: 'creator',
  }, {
    title: 'CHAINS',
    render: () => {
      const icons = Object.keys(CHAINS).map((key) => {
        const Icon = CHAINS[key].SvgComponent;
        return <Icon fill="white" key={key} />;
      });
      return (
        <div className="flex gap-3">
          {icons}
        </div>
      );
    },
  }, {
    title: 'STAKE',
    dataIndex: 'stake',
  }, {
    title: 'TVL',
    dataIndex: 'tvl',
  }, {
    title: 'APR',
    dataIndex: 'apr',
  }, {
    title: 'ROI',
    dataIndex: 'roi',
  }, {
    title: 'REWARD',
    dataIndex: 'reward',
  },
];

export const DEPLOYED_INFORMATION_COLUMNS = [
  {
    title: 'ORACLE',
    dataIndex: 'oracle',
  }, {
    title: 'CREATOR',
    dataIndex: 'creator',
  }, {
    title: 'CHAINS',
    render: () => {
      const icons = Object.keys(CHAINS).map((key) => {
        const Icon = CHAINS[key].SvgComponent;
        return <Icon fill="white" key={key} />;
      });
      return (
        <div className="flex gap-3">
          {icons}
        </div>
      );
    },
  }, {
    title: 'STAKE',
    dataIndex: 'stake',
  }, {
    title: 'TVL',
    dataIndex: 'tvl',
  }, {
    title: <>TOTAL <br /> EARNING</>,
    dataIndex: 'total_earning',
  }, {
    title: <>REWARD <br /> DISTRIBUTION</>,
    dataIndex: 'reward_distribution',
  }, {
    title: 'FEE PER CALL',
    dataIndex: 'fee_per_call',
  },
];

export function CustomButton(props) {
  const {
    theme,
    className,
    size,
    content,
    onClick,
  } = props;

  return (
    <Button
      theme={theme}
      className={className}
      size={size}
      onClick={onClick}
    >
      {content}
    </Button>
  );
}
