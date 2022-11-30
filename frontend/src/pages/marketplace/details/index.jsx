import { Col, Collapse, Row } from '@douyinfe/semi-ui';
import { IconTwitter, IconGithubLogo, IconCopy } from '@douyinfe/semi-icons';
// import ReactECharts from 'echarts-for-react';
import BaseLayout from '@/components/layout/BaseLayout';
import { StyledAddressItem, StyledCharWrap, StyledCollapse } from '../styled';
import DefaultAvatar from '@/assets/imgs/marketplace/default-avatar.png';
import ChainIcon from '@/components/comm/ChainIcon';

function MarketplaceDetails() {
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
            </StyledCharWrap>
          </Col>

          <Col lg={12} span={24}>
            <StyledCharWrap>
              <div className="header">
                <h1>Oracle APR performance</h1>
              </div>
            </StyledCharWrap>
          </Col>

          <Col lg={12} span={24}>
            <StyledCharWrap>
              <div className="header">
                <h1>Oracle Call performance chart</h1>
              </div>
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
