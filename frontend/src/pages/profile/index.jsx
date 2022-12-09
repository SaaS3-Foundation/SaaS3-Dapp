import { Button, Typography } from '@douyinfe/semi-ui';

import BaseLayout from '@/components/layout/BaseLayout';
import { ProfileContentWrap } from './styled';
import DefaultAvatar from '@/assets/imgs/default-avatar.png';
import { DEPLOYED_INFORMATION_COLUMNS, STAKE_INFORMATION_COLUMNS, WALLET_INFORMATION_COLUMNS } from './config';
import { StyledSemiTable } from '@/components/styled/table';

function Profile() {
  const walletData = [
    {
      address: '0x4A418110c1cd4391784508abF2c534Be887a61F7',
      chains: 'bsc',
    }, {
      address: '0x4A418110c1cd4391784508abF2c534Be887a61F7',
      chains: 'bsc',
    },
  ];
  const stakeData = [
    {
      oracle: 'BITCOIN... ORACLE',
      creator: 'FIFA Whale',
      chains: [1],
      stake: '100K(SAAS)',
      tvl: '2.2M SAAS',
      apr: '102%',
      roi: '10.13%',
      reward: '202.7 SAAS',
    },
  ];

  const deployedData = [
    {
      oracle: 'BITCOIN... ORACLE',
      creator: 'FIFA Whale',
      chains: [1],
      stake: '100K(SAAS)',
      tvl: '2.2M SAAS',
      total_earning: '200,000 SAAS',
      reward_distribution:
  <span>
    10% - Creator<br />
    30% - Miner<br />
    60% - Staker
  </span>,
      fee_per_call: '3 SAAS',
    },
  ];
  return (
    <BaseLayout>
      <div className="container">
        <Typography.Title heading={2}>USER INFORMATION</Typography.Title>

        <ProfileContentWrap className="!rounded-tl-[60px]">
          <div className="flex">
            <div className="avatar-wrap w-[100px] flex-shrink-0 flex items-center">
              <img src={DefaultAvatar} className="h-[100px] w-full object-cover" alt="avatar" />
            </div>
            <div className="ml-7 mr-20">
              <Typography.Text className="block text-xl font-bold">FIFA Whale</Typography.Text>
              <Typography.Paragraph className="mt-3">
                Hello guys! I am FIFA Whale, I have been producing oracles from 6 months now.
                I am a good oracle developer and am awesome too.
                If you have any questions please feel free to message me on twitter. Please use my oracles.
              </Typography.Paragraph>
            </div>
            <div>
              <Button
                theme="borderless"
                className="w-[100px] !text-white !border !border-white rounded-full"
                size="large"
                type="primary"
              >
                Edit
              </Button>
            </div>
          </div>
        </ProfileContentWrap>

        <Typography.Title heading={2}>WALLET INFORMATION</Typography.Title>
        <ProfileContentWrap className="!pt-0">
          <StyledSemiTable pagination={null} columns={WALLET_INFORMATION_COLUMNS} dataSource={walletData} />
        </ProfileContentWrap>

        <Typography.Title heading={2}>STAKE INFORMATION</Typography.Title>
        <ProfileContentWrap className="!pt-0">
          <StyledSemiTable pagination={null} columns={STAKE_INFORMATION_COLUMNS} dataSource={stakeData} />
        </ProfileContentWrap>

        <Typography.Title heading={2}>DEPLOYED ORACLES</Typography.Title>
        <ProfileContentWrap className="!pt-0">
          <StyledSemiTable pagination={null} columns={DEPLOYED_INFORMATION_COLUMNS} dataSource={deployedData} />
        </ProfileContentWrap>
      </div>

    </BaseLayout>
  );
}

export default Profile;
