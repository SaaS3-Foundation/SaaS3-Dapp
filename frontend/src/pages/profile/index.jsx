import {
  Button, Form, Input, Modal, Notification, TextArea, Typography,
} from '@douyinfe/semi-ui';
import { useRef, useState } from 'react';
import BaseLayout from '@/components/layout/BaseLayout';
import {
  ConfirmButton, DeclineButton, ProfileContentWrap, ProfileShadowBox,
} from './styled';
import DefaultAvatar from '@/assets/imgs/default-avatar.png';
import {
  DEPLOYED_INFORMATION_COLUMNS, STAKE_INFORMATION_COLUMNS, WALLET_INFORMATION_COLUMNS,
} from './config';
import { StyledSemiTable } from '@/components/styled/table';

import addIcon from '../../assets/imgs/svg/addIcon.svg';
import editIcon from '../../assets/imgs/svg/editIcon.svg';
import pasteIcon from '../../assets/imgs/svg/pasteIcon.svg';
import PrivacyField from './components/PrivacyField';
import { useUserInfo } from '@/hooks/profile';
import { update } from '@/api/profile';

function ProfileTable({
  data, title, attri, operation, isPaste,
}) {
  return (
    <div>
      {data.map((item, index) => (
        <ProfileContentWrap className="!pt-5" key={index}>
          <div className="flex justify-between">
            <Typography.Title heading={5}>{title} {index + 1}</Typography.Title>
            {operation}
          </div>
          <div>
            {Object.getOwnPropertyNames(item).map((attr, _index) => (
              <div className="mt-4 text-sm flex justify-between" key={_index}>
                <div>{attr}</div>
                <div className="inline-flex">
                  <div>{item[attr].length > 15 ? item[attr].slice(0, 7).concat('...').concat(item[attr].slice(-8, -1)) : item[attr]}</div>
                  {isPaste && <img src={pasteIcon} alt="" />}
                </div>
              </div>
            ))}
          </div>
        </ProfileContentWrap>
      ))}
    </div>
  );
}

function Profile() {
  const profileFormRef = useRef();
  const [FreePerCall, setFreePerCall] = useState('3 SAAS');
  const [FreeCallEdit, setFreeEdit] = useState(false);

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
      fee_per_call:
  <div className="flex">
    {FreeCallEdit
      ? <Input placeholder={FreePerCall} value={FreePerCall} onChange={(value, e) => { setFreePerCall(value); }} />
      : (
        <div className="flex">
          <div>{FreePerCall}</div>
          <div className="cursor-pointer" onClick={() => { setFreeEdit(true); }}>
            <img src={editIcon} alt="" />
          </div>
        </div>
      )}
  </div>,
    },
  ];

  // const {} =

  const [AddWalletModalVis, setAddModal] = useState(false);
  const [NoteModalVis, setNoteModal] = useState(false);
  const [StakeModalVis, setStakeModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakeSwitch, setSwitch] = useState(1);
  const { userInfo, updateUserInfo } = useUserInfo();

  const onSave = () => {
    profileFormRef.current.formApi.validate().then(async (values) => {
      try {
        const updateRet = await update(userInfo.id, {
          profile: values,
        });
        if (updateRet.code === 200) {
          await updateUserInfo();
          Notification.success({
            title: 'modify user info.',
            content: 'Successfully modified personal data.',
          });
          setEditing(false);
        } else {
          Notification.error({
            title: 'modify user info.',
            content: updateRet.msg,
          });
        }
      } catch (error) {
        Notification.error({
          title: 'modify user info.',
          content: 'Failed to modify personal data.',
        });
      }
    });
    // const values = profileFormRef.current.formApi.getValues();
    // console.log(values);
  };

  return (
    <BaseLayout>
      <div className="container nmd:px-[106px] nmd:py-[64px] xmd:pt-[2rem]">
        <Typography.Title heading={2}>USER INFORMATION</Typography.Title>

        <ProfileContentWrap className="nmd:!rounded-tl-[60px] xmd:!rounded-[2rem]">
          <Form ref={profileFormRef}>
            <div className="nmd:flex">
              <div className="avatar-wrap  flex-shrink-0 flex items-center xmd:justify-between">
                <img src={DefaultAvatar} className="w-[100px] h-[100px] xmd:w-[50px] xmd:h-[50px] object-cover" alt="avatar" />
                <div className="nmd:hidden flex-1 px-2">
                  {editing
                    ? <Form.Input initValue={userInfo?.profile?.name} rules={[{ required: true }]} field="name" noLabel placeholder="name" />
                    : <Typography.Text className="block text-xl font-bold">{userInfo?.profile?.name}</Typography.Text>}
                </div>
                <Button
                  theme="borderless"
                  className="w-[4.5rem] h-[2rem] !text-white !border !border-white rounded-full self-center nmd:hidden "
                  size="large"
                  type="primary"
                  onClick={() => (!editing ? setEditing(!editing) : onSave())}
                >
                  {!editing ? 'Edit' : 'Save'}
                </Button>
              </div>
              <div className="nmd:ml-7 nmd:mr-20 flex-1">
                <div className="xmd:hidden ">
                  {editing ? <Form.Input initValue={userInfo?.profile?.name} rules={[{ required: true }]} field="name" noLabel placeholder="name" />
                    : <Typography.Text className="block text-xl font-bold">{userInfo?.profile?.name}</Typography.Text>}
                </div>
                <div className="mt-4">
                  {
                    editing ? <Form.TextArea initValue={userInfo?.profile?.description} rules={[{ required: true }]} field="description" noLabel placeholder="description" /> : (
                      <Typography.Paragraph>{userInfo?.profile?.description}</Typography.Paragraph>
                    )
                  }
                </div>
                <div className="pr-20 mt-4 nmd:flex flex-wrap gap-10">
                  <PrivacyField
                    editing={editing}
                    field="email"
                    label="E-Mail"
                    value={userInfo?.profile?.email}
                    inputProps={{ rules: [{ type: 'email' }] }}
                  />
                  <PrivacyField value={userInfo?.profile?.twitter} editing={editing} field="twitter" label="Twitter" />
                  <PrivacyField value={userInfo?.profile?.github} editing={editing} field="github" label="Github" />
                  <PrivacyField value={userInfo?.profile?.telegram} editing={editing} field="telegram" label="Telegram" />
                </div>
              </div>
              <div>
                <Button
                  theme="borderless"
                  className="w-[100px] !text-white !border !border-white rounded-full xmd:hidden"
                  size="large"
                  type="primary"
                  onClick={() => (!editing ? setEditing(!editing) : onSave())}
                >
                  {!editing ? 'Edit' : 'Save'}
                </Button>
              </div>
            </div>
          </Form>
        </ProfileContentWrap>

        <ProfileShadowBox className="nmd:hidden w-[100vw] relative right-[20px] py-[1.5rem] px-[1.5rem] rounded-t-[2rem]">
          <div className="flex justify-between">
            <Typography.Title heading={4} className="">WALLET INFORMATION</Typography.Title>
            <Button
              theme="borderless"
              className="w-[4.5rem] h-[2rem] !text-white !border !border-white rounded-full self-center"
              size="large"
              type="primary"
              onClick={() => {
              }}
            >
              Add
            </Button>
          </div>
          <ProfileTable data={walletData} title="Wallet" attri={['Address', 'Chain']} />

          <Typography.Title heading={4}>STAKE INFORMATION</Typography.Title>
          <ProfileTable
            data={stakeData}
            attri={Object.getOwnPropertyNames(stakeData[0])}
            isPaste={false}
            operation={(
              <Button
                theme="borderless"
                className="w-max h-[2rem] !text-white !border !border-white rounded-full"
                size="large"
                onClick={() => { setStakeModal(true); }}
              >
                Operate
              </Button>
            )}
          />

          <Typography.Title heading={4}>DEPLOYED ORACLES</Typography.Title>
          <ProfileTable
            data={deployedData}
            attri={Object.getOwnPropertyNames(deployedData[0])}
            isPaste={false}
            operation={(
              <Button
                theme="borderless"
                className="w-max h-[2rem] !text-white !border !border-white rounded-full"
                size="large"
                onClick={() => { setNoteModal(true); }}
              >
                Operate
              </Button>
            )}
          />
        </ProfileShadowBox>

        <ProfileShadowBox className="xmd:hidden py-[22px] px-[25px] rounded-[30px]">
          <Typography.Title heading={2}>WALLET INFORMATION</Typography.Title>
          <ProfileContentWrap className="!pt-0">
            <StyledSemiTable
              pagination={null}
              columns={WALLET_INFORMATION_COLUMNS.concat({
                title: (
                  <div className="">
                    <img src={addIcon} alt="" />
                  </div>
                ),
                dataIndex: 'options',
              })}
              dataSource={walletData}
            />
          </ProfileContentWrap>

          <Typography.Title heading={2}>STAKE INFORMATION</Typography.Title>
          <ProfileContentWrap className="!pt-0">
            <StyledSemiTable
              pagination={null}
              columns={STAKE_INFORMATION_COLUMNS.concat({
                title: '',
                render: () => (
                  <Button
                    theme="borderless"
                    className="w-[100px] !text-white !border !border-white rounded-full"
                    size="large"
                    onClick={() => { setStakeModal(true); }}
                  >
                    Operate
                  </Button>
                ),
              })}
              dataSource={stakeData}
            />
          </ProfileContentWrap>

          <Typography.Title heading={2}>DEPLOYED ORACLES</Typography.Title>
          <ProfileContentWrap className="!pt-0">
            <StyledSemiTable
              pagination={null}
              columns={DEPLOYED_INFORMATION_COLUMNS.concat({
                title: '',
                render: () => (
                  <Button
                    theme="borderless"
                    className="w-[100px] !text-white !border !border-white rounded-full"
                    size="large"
                    onClick={() => { setNoteModal(true); }}
                  >
                    Update Now
                  </Button>
                ),
              })}
              dataSource={deployedData}
            />
          </ProfileContentWrap>
        </ProfileShadowBox>
      </div>

      <Modal
        className="!bg-white"
        header={<div className="my-3 self-center text-lg font-bold text-black">NOTE</div>}
        visible={NoteModalVis}
        footer={(
          <div className="text-black w-full flex justify-center">
            <DeclineButton
              size="large"
              onClick={() => { setNoteModal(false); }}
            >Decline
            </DeclineButton>
            <ConfirmButton
              size="large"
              theme="solid"
              onClick={() => { setNoteModal(false); setFreeEdit(false); }}
            >Confirm
            </ConfirmButton>
          </div>
        )}
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
      <Modal
        className="!bg-white"
        header={<div className="my-3 self-center text-lg font-bold text-black">STAKE</div>}
        visible={StakeModalVis}
        footer={(
          <div className="text-black w-full flex justify-center">
            <DeclineButton
              size="large"
              onClick={() => { setStakeModal(false); }}
            >Decline
            </DeclineButton>
            <ConfirmButton
              size="large"
              theme="solid"
              onClick={() => { setStakeModal(false); }}
            >Confirm
            </ConfirmButton>
          </div>
        )}
      >
        <div className="font-bold text-black">FIFA WORLD CUP 2022</div>
        <div className="px-5 py-1 flex mt-5 rounded-[50px] border-blue-500 border-2 items-center">
          <div className="flex">
            <div className="rounded-[8px] h-[16px] w-[16px] bg-red-500" />
            <div className="rounded-[8px] h-[16px] w-[16px] bg-yellow-500 relative right-[4px]" />
          </div>
          <Input
            className="border-none !text-black !font-bold"
            value={stakeAmount}
            onChange={(value) => setStakeAmount(value)}
          />
          <div className="px-2 py-1 rounded-[15px] border border-gray-300 cursor-pointer" onClick={() => { setStakeAmount(1000); }}>Max</div>
        </div>
        <div className="w-full flex mt-5 items-center">
          <div
            className={`h-[40px] leading-9 w-1/2 text-center border ${stakeSwitch === 1 ? 'border-black bg-black text-white' : 'border-gray-200'} rounded-l-[50px] text-lg`}
            onClick={() => { setSwitch(1); }}
          >
            Stake
          </div>
          <div
            className={`h-[40px] leading-9 w-1/2 text-center ${stakeSwitch === -1 ? 'border-black bg-black text-white' : 'border-gray-200'} rounded-r-[50px] border text-lg`}
            onClick={() => { setSwitch(-1); }}
          >
            Withdraw
          </div>
        </div>
        <div className="flex justify-between text-sm font-bold mt-5">
          <div>
            APR<br />
            Current Stake<br />
            Current Balance<br />
          </div>
          <div>
            30%<br />
            1,000.00<br />
            20,149.73
          </div>
        </div>
      </Modal>
    </BaseLayout>
  );
}

export default Profile;
