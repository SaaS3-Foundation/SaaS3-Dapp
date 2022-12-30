import {
  Button, Col, Image, Pagination, Row, Typography,
} from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useNavigate } from 'react-router';
import BaseLayout from '@/components/layout/BaseLayout';
import { ReactComponent as BlockViewSvg } from '@/assets/imgs/svg/Icon/block-view.svg';
import { ReactComponent as GridViewSvg } from '@/assets/imgs/svg/Icon/grid-view.svg';
import MarketItem from './components/MarketItem';
import { StyledCancelButton, StyledSearchWrap } from './styled';
import { StyledSemiTable } from '@/components/styled/table';
import defaultItemAvatar from '@/assets/imgs/default-item-avatar.png';
import { getMarketplaceList } from '@/api/marketplace';
import { formatDate } from '@/utils/utils';
import ChainIcon from '@/components/comm/ChainIcon';

function Marketplace() {
  const nav = useNavigate();
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        setFetching(true);
        const ret = await getMarketplaceList({
          page: pageIndex,
          size: pageSize,
        });
        if (ret.code === 200) {
          const { total: _total, list } = ret.data;
          setData(list);
          setTotal(_total);
        }
      } catch (error) {

      }
      setFetching(false);
    };
    fetch();
  }, [pageIndex, pageSize]);

  const columns = [
    {
      title: '',
      width: '140px',
      align: 'center',
      render: (_, row) => (
        <div className="flex items-center w-[140px]">
          <Image className="!flex-shrink-0 mr-2" src={defaultItemAvatar} preview={false} width={40} height={40} />
          <Typography.Title heading={6} ellipsis={{ rows: 1 }} className="flex-1">
            {row.oracleInfo.title}
          </Typography.Title>
        </div>
      ),
    },
    {
      title: 'Creator',
      width: '70px',
      align: 'center',
      render: (_, row) => row.creator.profile.name,
    },
    {
      title: 'Chain',
      width: '60px',
      align: 'center',
      render: (_, row) => <ChainIcon className="!cursor-default !bg-transparent" chainId={row.oracleInfo.targetChain.id} />,
    },
    {
      title: 'Creator Stake',
      width: '128px',
      align: 'center',
      render: () => '--',
    },
    {
      title: 'Stake Pool',
      width: '100px',
      align: 'center',
      render: () => '--',
    },
    {
      title: 'ARP',
      width: '60px',
      align: 'center',
      render: () => '--',
    },
    {
      title: 'Called',
      width: '100px',
      align: 'center',
      render: () => '--',
    },
    {
      title: 'Created',
      width: '180px',
      align: 'center',
      render: (_, row) => formatDate(row.create_at),
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
      render: (_, row) => (
        <div className="footer-wrap flex justify-center">
          <StyledCancelButton
            className="w-[90px]"
            theme="borderless"
            size="large"
            onClick={() => nav(`/marketplace/details/${row.id}`)}
          >
            DETAILS
          </StyledCancelButton>
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

  useEffect(() => {
    const onresize = () => {
      if (document.body.clientWidth <= 768) {
        if (!isGridView) {
          setIsGridView(true);
        }
      }
    };
    window.addEventListener('resize', onresize);
    return () => {
      window.removeEventListener('resize', onresize);
    };
  }, [isGridView]);

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
              className="rounded-[20px] bg-black/30 cursor-pointer ml-2.5 px-3.5 flex items-center border border-white/10 hover:border-primary-2 xmd:!hidden"
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
                  data.map((item, i) => (
                    <Col
                      key={i}
                      xl={6}
                      lg={12}
                      md={12}
                      span={24}
                    >
                      <MarketItem data={item} className={classNames({ block: !isGridView })} />
                    </Col>
                  ))
                }
              </Row>
            ) : <StyledSemiTable className="filter" pagination={false} columns={columns} dataSource={data} />}
          </div>

          <div className="text-right">
            <Pagination
              className="w-full justify-end"
              onPageChange={setPageIndex}
              total={total}
              pageSize={pageSize}
              currentPage={pageIndex}
            />
          </div>

        </div>
      </div>
    </BaseLayout>
  );
}

export default Marketplace;
