import { Typography } from '@douyinfe/semi-ui';
import { IconCopy } from '@douyinfe/semi-icons';
import { EVMNETWORKS } from '@/config/network';
import ChainIcon from '@/components/comm/ChainIcon';
import { copy, omitText } from '@/utils/utils';

export const WALLET_INFORMATION_COLUMNS = [
  {
    title: 'Wallet Address',
    width: '600px',
    render: (text, row, index) => (
      <div>
        <Typography.Text style={{ '--semi-color-link': 'white' }}>
          {index + 1}. {row.address}
        </Typography.Text>
        <IconCopy onClick={() => copy(row.address)} className="ml-6 cursor-pointer hover:text-gray-400 align-text-bottom" />
      </div>
    ),
  },
  {
    title: 'Chain',
    dataIndex: 'chain',
    render: (_, row) => <ChainIcon className="!bg-transparent" chainId={row.chain.chainId} />,
  },
];

export const MOBILE_WALLET_INFORMATION_COLUMNS = [
  {
    title: 'Address',
    width: '600px',
    render: (_, row) => (
      <div className="flex items-center justify-end">
        <Typography.Text style={{ '--semi-color-link': 'white' }}>
          {omitText(row.address)}
        </Typography.Text>
        <IconCopy onClick={() => copy(row.address)} className="ml-2 cursor-pointer hover:text-gray-400 align-text-bottom" />
      </div>
    ),
  },
  {
    title: 'Chain',
    render: (_, row) => <ChainIcon className="!bg-transparent" chainId={row.chain.chainId} />,
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
      const icons = Object.keys(EVMNETWORKS).map((key) => {
        const Icon = EVMNETWORKS[key].SvgComponent;
        return <Icon fill="white" key={key} />;
      });
      return (
        <div className="inline-flex gap-3">
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
    render: (_, row) => <Typography.Text>{omitText(row.oracleInfo.title)}</Typography.Text>,
  }, {
    title: 'CHAIN',
    render: (_, row) => <ChainIcon className="!cursor-default !bg-transparent" chainId={row.oracleInfo.targetChain.chainId} />,
  }, {
    title: 'STAKE',
    dataIndex: 'stake',
    render: () => '--',
  }, {
    title: 'TVL',
    dataIndex: 'tvl',
    render: () => '--',
  }, {
    title: <>TOTAL <br /> EARNING</>,
    dataIndex: 'total_earning',
    render: () => '--',
  }, {
    title: <>REWARD <br /> DISTRIBUTION</>,
    dataIndex: 'reward_distribution',
    render: () => '--',
  }, {
    title: 'FEE PER CALL',
    dataIndex: 'fee_per_call',
    render: () => '--',
  },
];

export const MOBILE_DEPLOYED_INFORMATION_COLUMNS = [
  {
    title: 'ORACLE',
    // dataIndex: 'oracleInfo.title',
    render: (_, row) => <Typography.Text>{omitText(row.oracleInfo.title)}</Typography.Text>,
  }, {
    title: 'CHAIN',
    render: (_, row) => <ChainIcon className="!cursor-default !bg-transparent" chainId={row.oracleInfo.targetChain.chainId} />,
  }, {
    title: 'STAKE',
    dataIndex: 'stake',
    render: () => '--',
  }, {
    title: 'TVL',
    dataIndex: 'tvl',
    render: () => '--',
  }, {
    title: <>TOTAL <br /> EARNING</>,
    dataIndex: 'total_earning',
    render: () => '--',
  }, {
    title: <>REWARD <br /> DISTRIBUTION</>,
    dataIndex: 'reward_distribution',
    render: () => '--',
  }, {
    title: 'FEE PER CALL',
    dataIndex: 'fee_per_call',
    render: () => '--',
  },
];
