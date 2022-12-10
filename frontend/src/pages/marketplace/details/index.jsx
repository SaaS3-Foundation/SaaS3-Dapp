import {
  Checkbox, Col, Collapse, Row, Typography,
} from '@douyinfe/semi-ui';
import { IconTwitter, IconGithubLogo, IconCopy } from '@douyinfe/semi-icons';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import BaseLayout from '@/components/layout/BaseLayout';
import { StyledAddressItem, StyledChartsWrap, StyledCollapse } from '../styled';
import DefaultAvatar from '@/assets/imgs/marketplace/default-avatar.png';
import ChainIcon from '@/components/comm/ChainIcon';
import { CHAINS_CHAINID } from '@/config/chain';

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

const option = (_data, _label, _axisLabel) => ({
  xAxis: {
    label: {
      show: false,
    },
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    label: {
      show: false,
    },
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
  tooltip: {
    extraCssText: 'width: max-content; white-space: pre; color: black; font-family: Nunito; font-weight: 700;',
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      axis: 'x',
    },
    formatter: function f(params, ticket, callback) {
      return `TVL: ${params[0].data[1]} M SAAS \r\nCreator Stake: 100K SAAS \r\nDate: ${params[0].data[0]} ${new Date().getFullYear()}`;
    },
  },
  series: [
    {
      type: 'line',
      smooth: 0.6,
      symbol: 'none',
      lineStyle: {
        color: '#0047FF',
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
            offset: 0, color: '#0047FF', // 0%
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
          <Col lg={12} span={24} className="py-7 px-16">
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

          <Col lg={12} span={24} className="relative z-20">
            <StyledChartsWrap>
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
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </StyledChartsWrap>
          </Col>

        </Row>
        <Row className="!mt-10" type="flex" gutter={[20, 20]}>

          <Col lg={12} span={24}>
            <StyledChartsWrap>
              <div className="header">
                <h1>Oracle APR performance</h1>
              </div>
              <ReactECharts
                className="mt-2"
                option={option(data2, '{value}%')}
                notMerge
                lazyUpdate
                theme="dark"
              />
            </StyledChartsWrap>
          </Col>

          <Col lg={12} span={24}>
            <StyledChartsWrap>
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
            </StyledChartsWrap>
          </Col>
        </Row>

        <StyledChartsWrap className="!bg-white/10 mt-8">
          <Typography.Title heading={3} className="indent-1">INFORMATION</Typography.Title>
          <div className="!py-10 mt-4">
            <div className="flex">
              <div className="flex-1">
                <Typography.Title heading={5}>API DETAILS</Typography.Title>
                <StyledCollapse className="mt-5" accordion>
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
                  <Typography.Title heading={5}>DEPLOYMENT DETAILS</Typography.Title>
                  <div className="flex ml-auto">
                    <ChainIcon className="mr-2" />
                    <ChainIcon chainId={CHAINS_CHAINID.BSC} />
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
          </div>
          <Typography.Title heading={3} className="indent-1">CREATORS NOTES</Typography.Title>
          <div className="mt-4 !py-6">
            <Typography.Text className="text-lg">
              While integrating with the oracle make sure to interact the
              correct roll up contract. Fund your wallet with SAAS and make
              sure to test the oracles before going production level. In regards
              to how to integrate with oracles you should refer to the SaaS3 documentation,
              despite how different each oracle with different apis are they have the sam eend
              integrartion method on the smart contract layer. In input parameter per oracle may differ,
              to understand the input parameters click the drop down button next to the respective API in the
              above “INFORMATION” section, on further inquiry you can refer to the API documentation using the
              document icon placed next to teh respective API in the “INFORMATION” section.
            </Typography.Text>
          </div>
        </StyledChartsWrap>
      </div>
    </BaseLayout>
  );
}

export default MarketplaceDetails;
