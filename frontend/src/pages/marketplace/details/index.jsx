import {
  Checkbox, CheckboxGroup, Col, Collapse, Row,
} from '@douyinfe/semi-ui';
import { IconTwitter, IconGithubLogo, IconCopy } from '@douyinfe/semi-icons';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import BaseLayout from '@/components/layout/BaseLayout';
import { StyledAddressItem, StyledCharWrap, StyledCollapse } from '../styled';
import DefaultAvatar from '@/assets/imgs/marketplace/default-avatar.png';
import ChainIcon from '@/components/comm/ChainIcon';

const data1 = [
  ['Jan', 2],
  ['Feb', 5],
  ['Mar', 7],
  ['Apr', 5],
  ['May', 2],
  ['Jun', 3],
  ['Jul', 4],
  ['Aug', 3],
  ['Sep', 1],
  ['Oct', 4],
  ['Nov', 2],
  ['Dec', 5],
];

const data2 = [
  ['Jan', 20],
  ['Feb', 56],
  ['Mar', 75],
  ['Apr', 58],
  ['May', 25],
  ['Jun', 30],
  ['Jul', 45],
  ['Aug', 30],
  ['Sep', 10],
  ['Oct', 40],
  ['Nov', 20],
  ['Dec', 50],
];

const data3 = [
  ['Jan', 2],
  ['Feb', 5],
  ['Mar', 7],
  ['Apr', 5],
  ['May', 2],
  ['Jun', 3],
  ['Jul', 4],
  ['Aug', 3],
  ['Sep', 1],
  ['Oct', 4],
  ['Nov', 2],
  ['Dec', 5],
];

const option = (_data, _label) => ({
  xAxis: {
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, 1],
    splitLine: { show: false },
    axisLabel: { formatter: _label },
  },
  visualMap: {
    type: 'piecewise',
    show: false,
    dimension: 0,
    seriesIndex: 0,
  },
  grid: {
    left: '10%', top: '10%', bottom: '10%', right: '5%',
  },
  series: [
    {
      type: 'line',
      smooth: 0.6,
      symbol: 'none',
      lineStyle: {
        color: '#7B61FF',
        width: 3,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#7B61FF', // 0%
          }, {
            offset: 1, color: '#2663FF00', // 100%
          }],
          global: false,
        },
      },
      data: _data,
    },
  ],
});

function MarketplaceDetails() {
  const [succ, setSucc] = useState(true);

  return (
    <BaseLayout>
      <div className="container pb-16">
        <Row className="!mt-5" type="flex" align="middle" gutter={[0, 50]}>
          <Col lg={12} span={24} className="bg-dark-bg-1 py-7 px-16 rounded-tl-[20px] rounded-bl-[20px]">
            <h1 className="text-2xl font-bold">FIFA 2022<br />WORLD CUP RESULT </h1>
            <p className="text-base mt-3">
              This Oracle reports the results of FIFA world cup.
              The official FIFA apis have been selected as the data feed for this oracle.
              A total of 10 APIs with solid aggregation logic and a deviance percentage of 0.5 %  has been placed.
              This Oracle reports the results of FIFA world cup. The official FIFA apis have been selected as the data feed for this oracle.
              A total of 10 APIs with solid aggregation logic and a deviance percentage of 0.5 %  has been placed.
              This Oracle reports the results of FIFA world cup. The official FIFA apis have been selected as the data feed for this oracle.
              A total of 10 APIs with solid aggregation logic and a deviance percentage of 0.5 %  has been placed.
            </p>
            <hr className="opacity-10 mt-5 mb-6" />
            <div className="flex">
              <img className="w-10" src={DefaultAvatar} alt="avatar" />
              <div className="flex-1 flex items-center ml-4">
                <h1 className="font-bold text-2xl">FIFA Whale</h1>
                <div className="ml-auto">
                  <IconTwitter className="text-2xl" />
                  <IconGithubLogo className="text-2xl" />
                </div>
              </div>
            </div>
            <p className="ml-14 text-text-dark-1 text-sm">
              Hello guys! I am FIFA Whale, I have been producing oracles from 6 months now.
              I am a good oracle developer and am awesome too.
              If you have any questions please feel free to message me...
            </p>
          </Col>

          <Col lg={12} span={24}>
            <StyledCharWrap>
              <div className="header">
                <h1>Oracle TVL Performance</h1>
              </div>
              <ReactECharts
                className="mt-2"
                option={option(data1, '{value}M')}
                notMerge
                lazyUpdate
                theme="dark"
                // onChartReady={this.onChartReadyCallback}
                // onEvents={EventsDict}
              />
            </StyledCharWrap>
          </Col>

          <Col lg={12} span={24}>
            <StyledCharWrap>
              <div className="header">
                <h1>Oracle APR performance</h1>
              </div>
              <ReactECharts
                className="mt-2"
                option={option(data2, '{value}%')}
                notMerge
                lazyUpdate
                theme="dark"
                // onChartReady={this.onChartReadyCallback}
                // onEvents={EventsDict}
              />
            </StyledCharWrap>
          </Col>

          <Col lg={12} span={24}>
            <StyledCharWrap>
              <div className="header flex justify-between">
                <h1>Oracle Call performance chart</h1>
                <div className="inline-block flex">
                  <Checkbox checked={succ} className="mr-5" value="succ" onChange={(e) => { setSucc(e.target.checked); }}>Successful Only</Checkbox>
                  <Checkbox checked={!succ} value="fail" onChange={(e) => { setSucc(e.target.checked); }}>Failed Only</Checkbox>
                </div>
              </div>
              <ReactECharts
                className="mt-2"
                option={option(data3, '{value}K')}
                notMerge
                lazyUpdate
                theme="dark"
                // onChartReady={this.onChartReadyCallback}
                // onEvents={EventsDict}
              />
            </StyledCharWrap>
          </Col>
        </Row>
        <h1 className="text-2xl font-bold mt-14 indent-1">INFORMATION</h1>
        <StyledCharWrap className=" !py-10 mt-4">

          <div className="flex">
            <div className="flex-1">
              <h2 className="text-lg mb-5 font-bold">API DETAILS</h2>
              <StyledCollapse accordion>
                <Collapse.Panel header="1. FIFA Official WORLD CUP Result API" itemKey="1">
                  123
                </Collapse.Panel>
                <Collapse.Panel header="2. FIFA YOYO WORLD CUP Result API" itemKey="2">
                  123
                </Collapse.Panel>
                <Collapse.Panel header="3. Binance FIFA WORLD CUP Result API" itemKey="3">
                  123
                </Collapse.Panel>
              </StyledCollapse>
            </div>
            <div className="flex-1 ml-[72px]">
              <div className="mb-5 flex items-center">
                <h2 className="text-lg font-bold">DEPLOYMENT DETAILS</h2>
                <div className="flex ml-auto">
                  <ChainIcon name="eth" />
                  <ChainIcon className="ml-2" name="bsc" />
                  {/* <span className=''><BscIcon /></span>
                  <span><EthIcon /></span> */}
                </div>
              </div>
              <StyledAddressItem>
                <span>1. 0x4A418110c1cd4391784508abF2c534Be887a61F7</span>
                <IconCopy />
              </StyledAddressItem>
              <StyledAddressItem>
                <span>1. 0x4A418110c1cd4391784508abF2c534Be887a61F7</span>
                <IconCopy />
              </StyledAddressItem>
              <StyledAddressItem>
                <span>1. 0x4A418110c1cd4391784508abF2c534Be887a61F7</span>
                <IconCopy />
              </StyledAddressItem>
              <StyledAddressItem>
                <span>1. 0x4A418110c1cd4391784508abF2c534Be887a61F7</span>
                <IconCopy />
              </StyledAddressItem>
            </div>
          </div>
        </StyledCharWrap>

        <h1 className="text-2xl font-bold mt-14 indent-1">CREATORS NOTES</h1>
        <StyledCharWrap className="mt-4 !py-6">
          <p className="text-lg">
            While integrating with the oracle make sure to interact the
            correct roll up contract. Fund your wallet with SAAS and make
            sure to test the oracles before going production level. In regards
            to how to integrate with oracles you should refer to the SaaS3 documentation,
            despite how different each oracle with different apis are they have the sam eend
            integrartion method on the smart contract layer. In input parameter per oracle may differ,
            to understand the input parameters click the drop down button next to the respective API in the
            above “INFORMATION” section, on further inquiry you can refer to the API documentation using the
            document icon placed next to teh respective API in the “INFORMATION” section.
          </p>
        </StyledCharWrap>
      </div>
    </BaseLayout>
  );
}

export default MarketplaceDetails;
