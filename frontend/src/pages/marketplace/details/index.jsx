import {
  Checkbox, Col, Collapse, Row, Tabs, Typography,
} from '@douyinfe/semi-ui';
import { IconTwitter, IconGithubLogo, IconCopy } from '@douyinfe/semi-icons';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import classNames from 'classnames';
import BaseLayout from '@/components/layout/BaseLayout';
import { StyledAddressItem, StyledChartsWrap, StyledCollapse } from '../styled';
import DefaultAvatar from '@/assets/imgs/marketplace/default-avatar.png';
import ChainIcon from '@/components/comm/ChainIcon';
import { EVM_CHAINID } from '@/config/network';
import { getDetail } from '@/api/marketplace';
import { copy } from '@/utils/utils';
import UrlPropsView from '../components/UrlPropsView';
import { toGithub, toTwitter } from '@/utils/toPlatform';

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
  const params = useParams();

  const [detail, setDetail] = useState({
    oracleInfo: {
      title: '--',
      web2Info: { },
      sourceChain: { },
      targetChain: { },
    },
    creator: {
      id: '--',
      name: '--',
      email: '--',
      github: '--',
      twitter: '--',
      telegram: '--',
      description: '--',
      wallets: [],
      oracles: null,
      create_at: '--',
      update_at: '--',
    },
  });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const ret = await getDetail({ id: params.id });
        if (ret.code === 200) {
          setDetail(ret.data);
        }
      } catch (error) {

      }
    };
    if (params.id) {
      fetchDetail();
    }
  }, [params.id]);

  return (
    <BaseLayout>
      <div className="container pb-16">
        <Row className="!mt-5" type="flex" gutter={[0, 50]}>
          <Col lg={12} span={24} className="py-7 px-16">
            <div className="flex flex-col h-full">

              <Typography.Title heading={1} className="text-2xl font-bold">{detail.oracleInfo.title}</Typography.Title>
              <Typography.Text className="text-base mt-3 mb-4">{detail.oracleInfo.description || '--'}</Typography.Text>

              <div className="mb-6 mt-auto">
                <hr className="opacity-10 mb-6" />
                <div className="flex">
                  <img className="w-10" src={DefaultAvatar} alt="avatar" />
                  <div className="flex-1 flex items-center ml-4">
                    <Typography.Title heading={4} className="font-bold text-2xl">{detail.creator.name}</Typography.Title>
                    <div className="ml-auto">
                      <IconTwitter onClick={() => toTwitter(detail.creator.twitter)} className="hover:text-gray-400 cursor-pointer text-2xl" />
                      <IconGithubLogo onClick={() => toGithub(detail.creator.github)} className="hover:text-gray-400 cursor-pointer text-2xl" />
                    </div>
                  </div>
                </div>
                <Typography.Text className="ml-14 text-text-dark-1 text-sm">{detail.creator.description || '--'}</Typography.Text>
              </div>
            </div>
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
                <div className="flex">
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
                  <Collapse.Panel header={detail.oracleInfo.web2Info.title} itemKey="1">
                    <div className="flex mt-2 items-center">
                      <Typography.Text>{detail.oracleInfo.web2Info.method}</Typography.Text>
                      <div className="ml-4 flex-1 flex items-center justify-between  border border-white/30 bg-black/30 rounded-md p-2">
                        <Typography.Text
                          style={{ '--semi-color-link': 'white' }}
                        >
                          {detail.oracleInfo.web2Info.uri?.split('?')?.[0] || '--'}
                        </Typography.Text>
                        <IconCopy
                          className="cursor-pointer hover:text-gray-500"
                          onClick={() => copy(detail.oracleInfo.web2Info.uri?.split('?')?.[0] || '--')}
                        />
                      </div>
                    </div>
                    <Tabs>
                      <Tabs.TabPane tab="Body" itemKey="Body">
                        <UrlPropsView data={detail.oracleInfo.web2Info.body} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Params" itemKey="Params">
                        <UrlPropsView data={detail.oracleInfo.web2Info.params} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Headers" itemKey="Headers">
                        <UrlPropsView data={detail.oracleInfo.web2Info.headers} />
                      </Tabs.TabPane>
                    </Tabs>
                  </Collapse.Panel>
                </StyledCollapse>
              </div>
              <div className="flex-1 ml-[72px]">
                <div className="mb-5 flex items-center">
                  <Typography.Title heading={5}>DEPLOYMENT DETAILS</Typography.Title>
                  <div className="flex ml-auto">
                    <ChainIcon className="active" chainId={detail.oracleInfo.targetChain.chainId || 1} />
                  </div>
                </div>
                <StyledAddressItem>
                  <Typography.Text>1. 0x4A418110c1cd4391784508abF2c534Be887a61F7</Typography.Text>
                  <IconCopy onClick={() => copy('0x4A418110c1cd4391784508abF2c534Be887a61F7')} />
                </StyledAddressItem>
              </div>
            </div>
          </div>
          <Typography.Title heading={3} className="indent-1">CREATORS NOTES</Typography.Title>
          <div className="mt-4 !py-6">
            <Typography.Text className="text-lg">{detail.creatorNote}</Typography.Text>
          </div>
        </StyledChartsWrap>
      </div>
    </BaseLayout>
  );
}

export default MarketplaceDetails;
