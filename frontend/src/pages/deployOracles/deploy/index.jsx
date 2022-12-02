import { Button, Typography } from '@douyinfe/semi-ui';
import { IconCopy, IconChevronUp } from '@douyinfe/semi-icons';
import BaseLayout from '@/components/layout/BaseLayout';
import { DeployWrap } from '../styled';

function Deploy() {
  return (
    <BaseLayout>
      <div className="container pt-5 pb-10">
        <Typography.Title heading={2}>
          DEFINE DATA SOURCE
        </Typography.Title>
        <DeployWrap className="!pt-0">
          <div className="header">
            <Typography.Title heading={4}>
              API 1
            </Typography.Title>
            <IconChevronUp className="hover" />
          </div>
          <div className="flex items-center mt-3">
            <Typography.Text>GET</Typography.Text>
            <div className="border p-[10px] round flex-1 ml-4 flex items-center">
              <Typography.Text>https://www.fifa.com/match/semi&result=final&10385553201</Typography.Text>
              <IconCopy className="ml-auto hover" />
            </div>

          </div>
          <div className="border rounded-[20px] mt-5 p-5">
            <div className="tabs">
              <span className="tab-panel active">Body</span>
              <span className="tab-panel">Auth</span>
              <span className="tab-panel">Params</span>
              <span className="tab-panel">Header</span>
            </div>
            <div className="mt-4">
              <div className="flex">
                <span className="border round flex-1 px-3 py-1">match</span>
                <span className="border round flex-1 px-3 ml-3 py-1">Qatar</span>
              </div>

              <div className="flex mt-2">
                <span className="border round flex-1 px-3 py-1">match</span>
                <span className="border round flex-1 px-3 ml-3 py-1">Qatar</span>
              </div>
            </div>
          </div>
        </DeployWrap>

        <Typography.Title heading={2}>
          DEFINE DATA END POINTS
        </Typography.Title>

        <DeployWrap>

          <div className="header">
            <Typography.Title heading={4}>
              API 1
            </Typography.Title>
            <div>
              <Typography.Text className="border round py-2 px-3 ml-2 font-bold">DATA ENDPOINT PATH:  details.winner</Typography.Text>
              <Typography.Text className="border round py-2 px-3 ml-2 font-bold">DATA ENDPOINT PATH:  details.winner</Typography.Text>
            </div>
            <IconChevronUp className="hover" />
          </div>

          <div className="mt-4 border rounded-[20px] p-5">
            code....
          </div>

        </DeployWrap>

        <Typography.Title heading={2}>
          VISIBILITY
        </Typography.Title>
        <DeployWrap>
          <Button className="border round !text-white" size="large">PUBLIC</Button>
          <Button className="border round !text-white ml-5" size="large">PRIVATE</Button>
        </DeployWrap>

        <Typography.Title heading={2}>
          INFORMATION
        </Typography.Title>
        <DeployWrap>
          <Typography.Title heading={3}>ORACLE TITLE</Typography.Title>
          <div className="round border py-2 px-4 mt-4 mb-5">FIFA 2022</div>

          <Typography.Title heading={3}>ORACLE DESCRIPTION</Typography.Title>
          <div className="round border py-2 px-4 mt-4">
            This Oracle reports the results of FIFA world cup. The official FIFA apis have been selected as the data feed for this oracle.
            A total of 10 APIs with solid aggregation logic and a deviance percentage of 0.5 %  has been placed.
          </div>
        </DeployWrap>

        <div className="text-center">
          <Button className="bg-primary-linear !text-white rounded-full w-[160px]" size="large">STAKE</Button>
        </div>
      </div>

    </BaseLayout>
  );
}

export default Deploy;
