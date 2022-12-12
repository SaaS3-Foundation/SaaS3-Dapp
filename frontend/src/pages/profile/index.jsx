import {
  Button, Input, Modal, Typography,
} from '@douyinfe/semi-ui';

import { useState } from 'react';
import BaseLayout from '@/components/layout/BaseLayout';
import { ConfirmButton, DeclineButton, ProfileContentWrap, ProfileShadowBox } from './styled';
import DefaultAvatar from '@/assets/imgs/default-avatar.png';
import { DEPLOYED_INFORMATION_COLUMNS, STAKE_INFORMATION_COLUMNS, WALLET_INFORMATION_COLUMNS } from './config';
import { StyledSemiTable } from '@/components/styled/table';
import sightIcon from '../../assets/imgs/svg/sight.svg';
import disSightIcon from '../../assets/imgs/svg/disSight.svg';

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
  <div>
    10% - Creator<br />
    30% - Miner<br />
    60% - Staker
  </div>,
      fee_per_call: '3 SAAS',
    },
  ];

  const [ModalVis, setModal] = useState(true);
  const [visibleIcon1, setVisible1] = useState(sightIcon);
  const [visibleIcon2, setVisible2] = useState(sightIcon);
  const [visibleIcon3, setVisible3] = useState(sightIcon);
  const [visibleIcon4, setVisible4] = useState(sightIcon);
  const [editStatus, setEdit] = useState(false);
  const [Email, setEmail] = useState('_blank');
  const [Twitter, setTwitter] = useState('_blank');
  const [Github, setGithub] = useState('_blank');
  const [Telegram, setTelegram] = useState('_blank');

  const IconHandleClick = (_visibleIcon, _setVisible) => {
    if (_visibleIcon === sightIcon) {
      _setVisible(disSightIcon);
    } else {
      _setVisible(sightIcon);
    }
  };

  return (
    <BaseLayout>
      <div className="container px-[106px] py-[64px]">
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
              <Typography.Paragraph className="pr-20 mt-3 flex inline-block justify-between">
                <div className="flex">
                  <div className="w-max" onClick={() => { IconHandleClick(visibleIcon1, setVisible1); }}>
                    <img src={visibleIcon1} alt="sightIcon" />
                  </div>
                  <div className="flex flex-col ml-1 w-max">
                    <div>E-Mail</div>
                    {editStatus
                      ? <div>{visibleIcon1 === sightIcon ? Email : '******'}</div>
                      : <Input value={Email} onChange={(value, e) => { setEmail(e.target.value); }} placeholder="" size="small" />}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-max" onClick={() => { IconHandleClick(visibleIcon2, setVisible2); }}>
                    <img src={visibleIcon2} alt="sightIcon" />
                  </div>
                  <div className="flex flex-col ml-1 w-max">
                    <div>Twitter</div>
                    {editStatus
                      ? <div>{visibleIcon2 === sightIcon ? Twitter : '******'}</div>
                      : <Input value={Twitter} onChange={(value, e) => { setTwitter(e.target.value); }} placeholder="" size="small" />}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-max" onClick={() => { IconHandleClick(visibleIcon3, setVisible3); }}>
                    <img src={visibleIcon3} alt="disSightIcon" />
                  </div>
                  <div className="flex flex-col ml-1 w-max">
                    <div>Github</div>
                    {editStatus
                      ? <div>{visibleIcon3 === sightIcon ? Github : '******'}</div>
                      : <Input value={Github} onChange={(value, e) => { setGithub(e.target.value); }} placeholder="" size="small" />}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-max" onClick={() => { IconHandleClick(visibleIcon4, setVisible4); }}>
                    <img src={visibleIcon4} alt="disSightIcon" />
                  </div>
                  <div className="flex flex-col ml-1 w-max">
                    <div>Telegram</div>
                    {editStatus
                      ? <div>{visibleIcon4 === sightIcon ? Telegram : '******'}</div>
                      : <Input value={Telegram} onChange={(value, e) => { setTelegram(e.target.value); }} placeholder="" size="small" />}
                  </div>
                </div>
              </Typography.Paragraph>
            </div>
            <div>
              <Button
                theme="borderless"
                className="w-[100px] !text-white !border !border-white rounded-full"
                size="large"
                type="primary"
                onClick={() => {
                  setEdit(!editStatus);
                }}
              >
                {editStatus ? 'Edit' : 'Save'}
              </Button>
            </div>
          </div>
        </ProfileContentWrap>

        <ProfileShadowBox className="py-[22px] px-[25px] rounded-[30px]">
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
        </ProfileShadowBox>
      </div>

      <Modal
        className="!bg-white"
        header={<div className="my-3 self-center text-lg font-bold text-black">NOTE</div>}
        visible={ModalVis}
        footer={(
          <div className="text-black w-full flex justify-center">
            <DeclineButton
              size="large"
              onClick={() => { setModal(false); }}
            >Decline
            </DeclineButton>
            <ConfirmButton
              size="large"
              theme="solid"
              onClick={() => { setModal(false); }}
            >Confirm
            </ConfirmButton>
          </div>
        )}
        onCancel={() => { setModal(false); }}
      >
        <div>Are you sure you want to change the REWARDS DISTRIBUTION for “FIFA WORLD CUP RESULT ORACLE” according to</div>
        <br />
        <div className="flex justify-between text-red-500 text-sm">
          <div>
            CURRENT VALUE<br />
            CREATOR = 10%<br />
            MINER = 30%<br />
            STAKER = 60%
          </div>
          <div>
            NEW VALUE<br />
            CREATOR = 50%<br />
            MINER = 25%<br />
            STAKER = 25%
          </div>
        </div>
      </Modal>

    </BaseLayout>
  );
}

export default Profile;
