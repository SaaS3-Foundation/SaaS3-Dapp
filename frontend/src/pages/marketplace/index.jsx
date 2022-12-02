import { Col, Row } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import BaseLayout from '@/components/layout/BaseLayout';
import { ReactComponent as ListSvg } from '@/assets/imgs/svg/Icon/List.svg';
import MarketItem from './components/MarketItem';

function Marketplace() {
  return (
    <BaseLayout contentClassName="bg-dark-1">
      <div className="container pb-20">
        <div className="input-wrap mt-10 h-[56px] flex justify-center">
          <div className="w-[610px] p-4 bg-[#1D2132B2] flex items-center rounded-md">
            <input className="flex-1" placeholder="input params" />
            <IconSearch className="ml-4" />
          </div>
          <div className="rounded-md bg-[#1D2132B2] cursor-pointer ml-2.5 px-3.5 flex items-center">
            <ListSvg fill="white" />
          </div>
        </div>

        <div className="marketplace-list-wrap mt-4">
          <Row gutter={[10, 18]}>
            {
              Array.from({ length: 40 }).fill().map((_, i) => (
                <Col key={i} xl={6} lg={12} md={12} span={24}>
                  <MarketItem />
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Marketplace;
