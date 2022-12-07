import {
  Col, Image, Row, Typography,
} from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router';
import BaseLayout from '@/components/layout/baseLayout';
import dataFree from '@/assets/imgs/deploy-oracles/datafree.png';
import dcmg from '@/assets/imgs/deploy-oracles/dcmg.png';
import crossChain from '@/assets/imgs/deploy-oracles/cross-chain.png';
import apis from '@/assets/imgs/deploy-oracles/apis.png';
import { StyledPanel } from './styled';

function SelectPanels() {
  const nav = useNavigate();
  const toDelopyPage = (type) => {
    nav(`/deploy-oracles/${type}`);
  };

  return (
    <BaseLayout>
      <div className="container mt-5">
        <Row type="flex" gutter={[10, 10]}>
          <Col lg={12} span={24}>
            <StyledPanel onClick={() => toDelopyPage('datafeed')}>
              <Image preview={false} width="100" src={dataFree} alt="" />
              <Typography.Text>Data or Price Feed</Typography.Text>
            </StyledPanel>
          </Col>
          <Col lg={12} span={24}>
            <StyledPanel>
              <Image preview={false} width="100" src={dcmg} />
              <Typography.Text>Decentralized Computation<br />for Metaverse & Games</Typography.Text>
            </StyledPanel>
          </Col>
          <Col lg={12} span={24}>
            <StyledPanel>
              <Image preview={false} width="100" src={crossChain} alt="" />
              <Typography.Text>Cross-chain Relayer</Typography.Text>
            </StyledPanel>
          </Col>
          <Col lg={12} span={24}>

            <StyledPanel>
              <Image preview={false} width="100" src={apis} alt="" />
              <Typography.Text>Function Emitter Web2 Integration. <br />Call Web2 APIS based on Web3 activity.</Typography.Text>
            </StyledPanel>
          </Col>
        </Row>
      </div>

    </BaseLayout>
  );
}

export default SelectPanels;
