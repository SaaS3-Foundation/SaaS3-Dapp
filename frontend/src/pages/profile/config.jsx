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
  {
    title: (
      <Button
        theme="borderless"
        className="w-[100px] !text-white !border !border-white rounded-full"
        size="large"
        type="primary"
      > Add Wallet
      </Button>
    ),
    dataIndex: 'options',
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
  }, {
    title: '',
    render: () => (
      <Button
        theme="borderless"
        className="w-[100px] !text-white !border !border-white rounded-full"
        size="large"
      >
        Operate
      </Button>
    ),
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
  }, {
    title: '',
    render: () => (
      <Button
        theme="borderless"
        className="w-[100px] !text-white !border !border-white rounded-full"
        size="large"
      >
        Operate
      </Button>
    ),
  },
];
