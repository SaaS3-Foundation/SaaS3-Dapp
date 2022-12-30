import { forwardRef } from 'react';
import RefSemiModal from '@/components/comm/RefSemiModal';
import { ConfirmButton, DeclineButton } from '../../styled';

function OracleUpdateModal(props, ref) {
  // const {} = props;

  const onDecline = () => {
    ref.current.close();
  };
  return (
    <RefSemiModal
      ref={ref}
      className="!bg-white"
      header={<div className="my-3 self-center text-lg font-bold text-black">NOTE</div>}
      footer={(
        <div className="w-full flex justify-center">
          <DeclineButton size="large" onClick={onDecline}>
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
    </RefSemiModal>
  );
}

export default forwardRef(OracleUpdateModal);
