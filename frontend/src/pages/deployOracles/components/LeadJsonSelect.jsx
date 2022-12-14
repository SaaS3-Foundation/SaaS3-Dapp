import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import classNames from 'classnames';
import JsonTree from '@/components/comm/JsonTree';
import { ReactComponent as Vector } from '@/assets/imgs/svg/vector.svg';

const Wrap = styled.div`
  margin-top: 12px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  /* position: absolute; */
  >.mask-wrap{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 12px;
    >.first-text{
      position: absolute;
      transition: all .3s;
      transition-timing-function: cubic-bezier(.55, 0, .85, .36);
      &.move1{
        /* transform: matrix(); */
        transform: translate3d(100px,100px, 0);
      }
    }
  }
`;

const moveToPath = keyframes`
  from {
    offset-distance: 0%;
  }
  to{
    offset-distance: 46%;
  }
`;

// const VectorIcon = styled(Vector)`
//   offset-rotate: 0deg;
//   offset-path: path("M240 10 C 240 160, 160 140, 160 160 C 120 80, 300 200, 130 228");
//   animation: ${moveToPath} 0.6s ease-in forwards;
// `;

const demoJson = {
  match: 1,
  country1: 'Qatar',
  countrycode1: 'QAT',
  country2: 'Ecuador',
  countrycode2: 'ECU',
  details: {
    date: '20102022',
    winner: 'QAT',
    code: 1,
    countryscore1: 2,
    countryscore2: 0,
    is: true,
  },
};

function LeadJsonSelect() {
  const [isMove, setMove] = useState(false);

  return (
    <Wrap>
      <JsonTree
        data={demoJson}
        shouldExpandNode={() => true}
      />
      <div className={classNames('mask-wrap')} onClick={() => setMove(!isMove)}>
        {/* <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M240 10 C 240 160, 160 140, 160 160 C 120 80, 300 200, 130 228" stroke="white" fill="transparent" />
        </svg> */}
        {/* <p className={classNames('first-text', {
          move1: isMove,
        })}
        >
          first
        </p> */}
        {/* <VectorIcon className="absolute w-4 h-4" /> */}
        {/* <div>
          <Vector className="absolute top-10 w-4 h-4" />
        </div> */}
      </div>
    </Wrap>
  );
}

export default LeadJsonSelect;
