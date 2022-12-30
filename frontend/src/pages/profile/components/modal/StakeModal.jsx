import { forwardRef, useRef, useState } from 'react';
import { Input } from '@douyinfe/semi-ui';
import styled from 'styled-components';
import RefSemiModal from '@/components/comm/RefSemiModal';
import { ConfirmButton, DeclineButton } from '../../styled';

const StyledRadioBox = styled.div`
  border: 1px solid rgba(18, 3, 58, 0.1);
  border-radius: 60px 0 0 60px;
  height: 40px;
  flex: 1;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  transition: all .2s;
  &.active,&:hover{
    background: #12033A;
    border-color: #12033A;
    color: white;
  }
  &+&{
    /* border-left: none; */
  }
  &:last-of-type{
    border-radius: 0 60px 60px 0;
  }
`;

function StakeModal(props, ref) {
  // const {} = props;

  const [type, setType] = useState('stake');

  const switchType = (_type) => {
    // const nextType = type === 'stake' ? 'withdraw' : 'stake';
    setType(_type);
  };

  return (
    <RefSemiModal
      ref={ref}
      className="!bg-white"
      header={<div className="my-3 self-center text-lg font-bold text-black">STAKE</div>}
      footer={(
        <div className="text-black w-full flex justify-center">
          <DeclineButton
            theme="light"
            size="large"
            onClick={() => ref.current.close()}
          >
            Decline
          </DeclineButton>
          <ConfirmButton
            size="large"
            theme="solid"
          >
            Confirm
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
          placeholder="Amount"
          className="semi-placeholder-gray !bg-transparent border-none !text-black !font-bold"
        />
        <div className="px-2 py-1 rounded-[15px] border border-gray-300 cursor-pointer">Max</div>
      </div>
      <div className="w-full flex mt-5 items-center">
        <StyledRadioBox
          onClick={() => switchType('stake')}
          className={type === 'stake' ? 'active' : ''}
        >
          Stake
        </StyledRadioBox>
        <StyledRadioBox
          onClick={() => switchType('withdraw')}
          className={type === 'withdraw' ? 'active' : ''}
        >
          Withdraw
        </StyledRadioBox>
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
    </RefSemiModal>
  );
}

export default forwardRef(StakeModal);
