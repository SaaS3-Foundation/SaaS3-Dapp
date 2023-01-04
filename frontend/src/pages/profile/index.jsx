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
import { update } from '@/api/profile';
import AddWalletModal from './components/modal/AddWalletModal';
import { useUserInfo } from '@/hooks/provider';
import { toGithub, toTwitter } from '@/utils/toPlatform';
import OracleUpdateModal from './components/modal/OracleUpdateModal';
import StakeModal from './components/modal/StakeModal';

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
  const stakeModalRef = useRef();
  const oracleUpdateModalRef = useRef();
  const addWalletModalRef = useRef();
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
  const [editing, setEditing] = useState(false);
  const { userInfo, loginUser } = useUserInfo();

  const onSave = () => {
    profileFormRef.current.formApi.validate().then(async (values) => {
      try {
        const updateRet = await update(userInfo.id, values);
        if (updateRet.code === 200) {
          await loginUser();
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
                    ? <Form.Input initValue={userInfo?.name} rules={[{ required: true }]} field="name" noLabel placeholder="name" />
                    : <Typography.Text className="block text-xl font-bold">{userInfo?.name}</Typography.Text>}
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
                  {editing ? <Form.Input initValue={userInfo?.name} rules={[{ required: true }]} field="name" noLabel placeholder="name" />
                    : <Typography.Text className="block text-xl font-bold">{userInfo?.name}</Typography.Text>}
                </div>
                <div className="mt-4">
                  {
                    editing ? <Form.TextArea initValue={userInfo?.description} rules={[{ required: true }]} field="description" noLabel placeholder="description" /> : (
                      <Typography.Paragraph>{userInfo?.description}</Typography.Paragraph>
                    )
                  }
                </div>
                <div className="pr-20 mt-4 nmd:flex flex-wrap gap-10">
                  <PrivacyField
                    editing={editing}
                    field="email"
                    label="E-Mail"
                    value={userInfo?.email}
                    inputProps={{ rules: [{ type: 'email' }] }}
                  />
                  <PrivacyField
                    value={userInfo?.twitter}
                    editing={editing}
                    field="twitter"
                    label="Twitter"
                    onClick={() => toTwitter(userInfo?.twitter)}
                    link
                  />
                  <PrivacyField
                    value={userInfo?.github}
                    onClick={() => toGithub(userInfo?.github)}
                    link
                    editing={editing}
                    field="github"
                    label="Github"
                  />
                  <PrivacyField value={userInfo?.telegram} editing={editing} field="telegram" label="Telegram" />
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
              onClick={() => addWalletModalRef.current.open()}
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
                onClick={() => stakeModalRef.current.open()}
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
                onClick={() => oracleUpdateModalRef.current.open()}
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
                  <div className="cursor-pointer" onClick={() => addWalletModalRef.current.open()}>
                    <img src={addIcon} alt="" />
                  </div>
                ),
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
                    onClick={() => stakeModalRef.current.open()}
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
                    onClick={() => oracleUpdateModalRef.current.open()}
                  >
                    Update Now
                  </Button>
                ),
              })}
              dataSource={userInfo?.oracles}
            />
          </ProfileContentWrap>
        </ProfileShadowBox>
      </div>

      <OracleUpdateModal ref={oracleUpdateModalRef} />

      <StakeModal ref={stakeModalRef} />
      <AddWalletModal ref={addWalletModalRef} />
    </BaseLayout>
  );
}

export default Profile;
