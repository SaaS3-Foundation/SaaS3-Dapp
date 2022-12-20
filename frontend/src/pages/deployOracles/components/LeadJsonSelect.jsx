import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import JsonTree from '@/components/comm/JsonTree';
import { ReactComponent as MouseIcon } from '@/assets/imgs/svg/vector.svg';

const Wrap = styled.div`
  margin-top: 12px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  background-color: black;
  >.mask-wrap{
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 12px;
  }
`;

const mouseWave = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
    border: 2px solid #1781ef;
    box-shadow:  0 0 20px #1781ef;
  }

  to {
    transform: scale(3);
    opacity: 0;
  }
`;

const MouseWrap = styled.div`
  position: relative;
  animation: moveX1 0.5s forwards, moveX2 0.5s forwards 1s;
  animation-timing-function: linear;
  >div{
    animation: moveY1 0.5s forwards, moveY2 0.5s forwards 1s;
    animation-timing-function: ease-in;
    >svg{
      animation: clickScale 0.2s 0.6s,  clickScale 0.2s 1.6s;
      animation-timing-function: ease-out ;
      animation-direction: alternate-reverse;
    }
    &::after{
      display: inline-block;
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 50%;
      z-index: -1;
      position: absolute;
      top: -12px;
      left: -12px;
      animation: ${mouseWave} 0.5s forwards linear 0.7s, ${mouseWave} 0.5s forwards linear 1.7s;
    }
  }

  @keyframes clickScale {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.6);
    }
  }


  @keyframes moveX1 {
    from {
      transform: translateX(240px);
      /* transform: translateX(0); */
    }
    to {
      transform: translateX(130px);
      /* transform: translateX(156px); */
    }
  }

  @keyframes moveX2 {
    from {
      transform: translateX(130px);
      /* transform: translateX(156px); */
    }
    to {
      transform: translateX(156px);
      /* transform: translateX(130px); */
    }
  }

  @keyframes moveY1 {
    from {
      transform: translateY(300px);
      /* transform: translateY(0); */
    }
    to {
      transform: translateY(230px);
      /* transform: translateY(90px); */
    }
  }

  @keyframes moveY2 {
    from {
      transform: translateY(230px);
      /* transform: translateY(90px); */
    }
    to {
      transform: translateY(90px);
      /* transform: translateY(230px); */
    }
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
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (showAnimation) {
      let inter;
      inter = setTimeout(() => {
        setShowAnimation(false);
        inter = setTimeout(() => {
          setShowAnimation(true);
          clearTimeout(inter);
        });
      }, 4000);
    }
  }, [showAnimation]);

  return (
    <Wrap>
      <JsonTree
        data={demoJson}
        shouldExpandNode={() => true}
      />
      <div className={classNames('mask-wrap')} onClick={() => setMove(!isMove)}>
        {showAnimation && (
          <MouseWrap>
            <div>
              <MouseIcon fill="white" className=" w-4 h-4" />
            </div>
          </MouseWrap>
        )}
      </div>
    </Wrap>
  );
}

export default LeadJsonSelect;
