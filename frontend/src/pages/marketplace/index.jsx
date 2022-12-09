import {
  Button, Col, Image, Row, Typography,
} from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { useState } from 'react';
import classNames from 'classnames';
import BaseLayout from '@/components/layout/BaseLayout';
import { ReactComponent as BlockViewSvg } from '@/assets/imgs/svg/Icon/block-view.svg';
import { ReactComponent as GridViewSvg } from '@/assets/imgs/svg/Icon/grid-view.svg';
import MarketItem from './components/MarketItem';
import { StyledCancelButton, StyledSearchWrap } from './styled';
import { StyledSemiTable } from '@/components/styled/table';
import defaultItemAvatar from '@/assets/imgs/default-item-avatar.png';

function Marketplace() {
  const [isGridView, setIsGridView] = useState(true);

  const columns = [
    {
      title: '',
      width: '140px',
      align: 'center',
      render: () => (
        <div className="flex items-center">
          <Image className="!flex-shrink-0" src={defaultItemAvatar} preview={false} width={20} height={20} />
          <Typography.Title heading={6}>
            FIFA 2022
          </Typography.Title>
        </div>
      ),
    },
    {
      title: 'Created',
      width: '70px',
      align: 'center',
      render: () => 'Fifa Whale',
    },
    {
      title: 'Chain',
      width: '60px',
      align: 'center',
      render: () => {},
    },
    {
      title: 'Creator Stake',
      width: '128px',
      align: 'center',
      render: () => {},
    },
    {
      title: 'Stake Pool',
      width: '100px',
      align: 'center',
      render: () => {},
    },
    {
      title: 'ARP',
      width: '60px',
      align: 'center',
      render: () => '30%',
    },
    {
      title: 'Called',
      width: '100px',
      align: 'center',
      render: () => '720 Times',
    },
    {
      title: 'Created',
      width: '80px',
      align: 'center',
      render: () => '6months ago',
    },
    {
      title: 'Accuracy',
      width: '70px',
      align: 'center',
      render: () => '99.8%',
    },
    {
      title: 'Price Per Call($SaaS)',
      width: '160px',
      align: 'center',
      render: () => '2 $SaaS',
    },
    {
      title: '',
      render: () => (
        <div className="footer-wrap flex justify-center">
          <StyledCancelButton className="w-[90px]" theme="borderless" size="large">DETAILS</StyledCancelButton>
          <Button
            theme="borderless"
            style={{
              '--semi-color-primary': 'white',
            }}
            size="large"
            className="bg-primary-linear rounded-full ml-1 w-[150px]"
          >
            STAKE
          </Button>
        </div>
      ),
    },
  ];

  return (
    <BaseLayout contentClassName="bg-dark-1">
      <div className="container pb-20">
        <div className="max-w-[1280px] mx-auto bg-white/10 py-4 px-6 rounded-[30px] mt-7">
          <div className="input-wrap mt-10 h-[56px] flex justify-center">
            <StyledSearchWrap>
              <input className="flex-1" placeholder="input params" />
              <IconSearch className="ml-4" />
            </StyledSearchWrap>
            <div
              className="rounded-[20px] bg-black/30 cursor-pointer ml-2.5 px-3.5 flex items-center border border-white/10 hover:border-primary-2"
              onClick={() => setIsGridView(!isGridView)}
            >
              {
                isGridView ? <BlockViewSvg fill="white" /> : <GridViewSvg fill="white" />
              }
            </div>
          </div>

          <div className="marketplace-list-wrap mt-10">
            {isGridView ? (
              <Row gutter={[10, 18]}>
                {
                  Array.from({ length: 40 }).fill().map((_, i) => (
                    <Col
                      key={i}
                      // {...(isGridView ? {
                      //   xl: 6, lg: 12, md: 12, span: 24,
                      // } : {})}
                      xl={6}
                      lg={12}
                      md={12}
                      span={24}
                    >
                      <MarketItem className={classNames({ block: !isGridView })} />
                    </Col>
                  ))
                }
              </Row>
            ) : <StyledSemiTable pagination={false} columns={columns} dataSource={[{}]} />}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Marketplace;
