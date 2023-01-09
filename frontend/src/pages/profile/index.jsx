import {
  Button, Form, Notification, Typography,
} from '@douyinfe/semi-ui';
import { useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import BaseLayout from '@/components/layout/BaseLayout';
import { ProfileContentWrap, ProfileShadowBox } from './styled';
import DefaultAvatar from '@/assets/imgs/default-avatar.png';
import {
  DEPLOYED_INFORMATION_COLUMNS, MOBILE_DEPLOYED_INFORMATION_COLUMNS,
} from './config';

import PrivacyField from './components/PrivacyField';
import { update } from '@/api/profile';
import AddWalletModal from './components/modal/AddWalletModal';
import { useUserInfo } from '@/hooks/provider';
import { toGithub, toTwitter } from '@/utils/toPlatform';
import OracleUpdateModal from './components/modal/OracleUpdateModal';
import StakeModal from './components/modal/StakeModal';
import Table from './components/Table';

function Profile() {
  const profileFormRef = useRef();
  const stakeModalRef = useRef();
  const oracleUpdateModalRef = useRef();
  const addWalletModalRef = useRef();
  const [FreePerCall, setFreePerCall] = useState('3 SAAS');
  const [FreeCallEdit, setFreeEdit] = useState(false);

  const [editing, setEditing] = useState(false);
  const { userInfo, mutate } = useUserInfo();

  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const onSave = () => {
    if (!Object.keys(profileFormRef.current.formApi.getFormState().touched).length) {
      return setEditing(false);
    }
    profileFormRef.current.formApi.validate().then(async (values) => {
      try {
        const updateRet = await update(userInfo.id, {
          description: '',
          email: '',
          github: '',
          telegram: '',
          twitter: '',
          ...values,
        });
        if (updateRet.code === 200) {
          mutate();
          Notification.success({
            title: 'modify user info.',
            content: 'Successfully modified personal data.',
          });
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
      setEditing(false);
    });
  };

  return (
    <BaseLayout>
      <div className="container nmd:px-[106px] nmd:py-[64px] xmd:py-[2rem]">
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
                  onClick={() => {
                    if (!isConnected) return openConnectModal();
                    !editing ? setEditing(!editing) : onSave();
                  }}
                >
                  {!editing ? 'Edit' : 'Save'}
                </Button>
              </div>
              <div className="nmd:ml-7 nmd:mr-20 flex-1">
                <div className="xmd:hidden ">
                  {editing ? <Form.Input initValue={userInfo?.name} rules={[{ required: true }]} field="name" noLabel placeholder="name" />
                    : <Typography.Text className="block text-xl font-bold">{userInfo?.name || '--'}</Typography.Text>}
                </div>
                <div className="mt-4">
                  {
                    editing ? <Form.TextArea initValue={userInfo?.description} field="description" noLabel placeholder="description" /> : (
                      <Typography.Paragraph>{userInfo?.description || '--'}</Typography.Paragraph>
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
                  onClick={() => {
                    if (!isConnected) return openConnectModal();
                    !editing ? setEditing(!editing) : onSave();
                  }}
                >
                  {!editing ? 'Edit' : 'Save'}
                </Button>
              </div>
            </div>
          </Form>
        </ProfileContentWrap>

        <ProfileShadowBox className="py-[22px] px-[25px] rounded-[30px]">
          {/* <div className="flex justify-between">
            <Typography.Title className="xmd:!text-xl" heading={2}>WALLET INFORMATION</Typography.Title>
            <Button
              theme="borderless"
              className="nmd:hidden w-[4.5rem] h-[2rem] !text-white !border !border-white rounded-full"
              size="large"
              type="primary"
              onClick={() => addWalletModalRef.current.open()}
            >
              Add
            </Button>
          </div>
          <Table
            pagination={null}
            columns={WALLET_INFORMATION_COLUMNS.concat({
              title: (
                <div className="cursor-pointer" onClick={() => addWalletModalRef.current.open()}>
                  <img src={addIcon} alt="" />
                </div>
              ),
            })}
            mobileColumns={MOBILE_WALLET_INFORMATION_COLUMNS}
            // eslint-disable-next-line react/no-unstable-nested-components
            mobileTitleRender={(_, index) => <Typography.Title heading={4}>Wallet {index + 1}</Typography.Title>}
            dataSource={userInfo?.wallets}
          /> */}

          {/* <Typography.Title className="xmd:!text-xl" heading={2}>STAKE INFORMATION</Typography.Title>
          <Table
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
          /> */}

          <Typography.Title className="xmd:!text-xl" heading={2}>DEPLOYED ORACLES</Typography.Title>

          <Table
            pagination={null}
            columns={DEPLOYED_INFORMATION_COLUMNS.concat({
              title: '',
              render: () => (
                <Button
                  theme="borderless"
                  className="w-[100px] !text-white !border !border-white rounded-full"
                  size="large"
                  disabled
                  onClick={() => oracleUpdateModalRef.current.open()}
                >
                  Update Now
                </Button>
              ),
            })}
            mobileColumns={MOBILE_DEPLOYED_INFORMATION_COLUMNS}
            // eslint-disable-next-line react/no-unstable-nested-components
            mobileTitleRender={(_, i) => (
              <div className="flex items-center justify-between">
                <Typography.Title heading={4}>ORACLES-{i}</Typography.Title>
                <Button
                  theme="borderless"
                  className="w-[100px] !text-white !border !border-white rounded-full"
                  size="large"
                  disabled
                  onClick={() => oracleUpdateModalRef.current.open()}
                >
                  Operation
                </Button>
              </div>
            )}
            dataSource={userInfo?.dapis}
          />
        </ProfileShadowBox>
      </div>

      <OracleUpdateModal ref={oracleUpdateModalRef} />

      <StakeModal ref={stakeModalRef} />
      <AddWalletModal ref={addWalletModalRef} />
    </BaseLayout>
  );
}

export default Profile;
