import { forwardRef, useState } from 'react';
import {
  Button, Form, Input, Typography,
} from '@douyinfe/semi-ui';
import classNames from 'classnames';
import { ethers } from 'ethers';
import RefSemiModal from '@/components/comm/RefSemiModal';
import { StyledRoundBlueBox } from '../../styled';
import { EVMNETWORKS } from '@/config/network';

function AddWalletModal(props, ref) {
  const [chainId, setChainId] = useState(1);

  const onSubmit = (values) => {
    console.log(values, 'values');
  };

  return (
    <RefSemiModal
      ref={ref}
      footer={null}
      header={(
        <div className="pt-4">
          <Typography.Title className="text-black text-center" heading={3}>Add Wallet</Typography.Title>
        </div>
      )}
    >
      <Form onSubmit={onSubmit}>
        <div className="pb-4">
          <div className="mt-2">
            <Typography.Title heading={4}>Wallet Address</Typography.Title>
            <Form.Input
              rules={[
                { required: true },
                {
                  validator: (rule, value, callback) => {
                    if (value && !ethers.utils.isAddress(value)) {
                      return callback(new Error('Incorrect address format'));
                    }
                    callback();
                  },
                },
              ]}
              field="address"
              noLabel
              placeholder="wallet address"
              fieldClassName="semi-placeholder-gray"
              className="py-2 px-2 !h-auto border-black rounded-full !bg-transparent"
              style={{
                '--semi-color-focus-border': '#0047FF',
              }}
            />
          </div>
          <div className="mt-4">
            <Typography.Title heading={4}>Networks</Typography.Title>

            <div className="flex gap-4 text-center">
              {Object.keys(EVMNETWORKS).map((key) => {
                const Icon = EVMNETWORKS[key].SvgComponent;
                return (
                  <StyledRoundBlueBox
                    key={key}
                    className={classNames('is-hover gap-2 cursor-pointer flex-1 !px-2 mt-4', {
                      active: chainId === EVMNETWORKS[key].chain.id,
                    })}
                    onClick={() => setChainId(EVMNETWORKS[key].chain.id)}
                  >
                    <Icon />
                    <Typography.Text>{EVMNETWORKS[key].name}</Typography.Text>
                  </StyledRoundBlueBox>
                );
              })}

            </div>
          </div>
          <Button htmlType="submit" theme="solid" className="mt-4 bg-[#0348FF] rounded-full w-full h-[50px]">Add</Button>
        </div>
      </Form>

    </RefSemiModal>
  );
}

export default forwardRef(AddWalletModal);
