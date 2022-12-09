import {
  Button, Form, Tabs, Typography, Upload,
} from '@douyinfe/semi-ui';
import { IconChevronUp, IconChevronDown } from '@douyinfe/semi-icons';
import { useState } from 'react';
import BaseLayout from '@/components/layout/BaseLayout';
import { DeployWrap } from '../styled';
import { deploy } from '@/contracts/deploy';
import { readFileContent } from '@/utils/file';
import { usePolkadotWallet } from '@/hooks/wallet';
import UrlHeaderInputs from '../components/UrlHeaderInputs';

function Deploy() {
  const { account } = usePolkadotWallet();
  const [file, setFile] = useState();
  const onFileChange = (files) => {
    const [_file] = files;
    setFile(_file);
  };
  const onDeploy = async () => {
    const content = (await readFileContent(file))?.target?.result;
    const config = {
      target_chain_rpc: '', // saas3 protocol rpc
      anchor_contract_addr: account.address,
      web2_api_url_prefix: '',
      api_key: '',
    };
    console.log(content, config);
    await deploy(
      // '0x180f0b2b8ba91b2a937ead4418f1fc810affc2ab82b23f36062b97dddf2da97e1e760b03a18eed8e3591d96ea7527c353380178fd90bdc8eeb36e503f67d4457',
      account,
      content,
      config,
    );
  };
  return (
    <BaseLayout>
      <div className="container pt-5 pb-10">
        <Form>
          <div className="max-w-wrap mx-auto">
            <DeployWrap>
              <Upload limit={1} action="" uploadTrigger="custom" onFileChange={onFileChange}>
                <Button theme="light" style={{ marginRight: 8 }}>
                  Choose file
                </Button>
              </Upload>
              <div>
                <Button onClick={onDeploy}>deploy</Button>
              </div>

            </DeployWrap>
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
                <div className="flex items-center border border-white py-2 px-4 round cursor-pointer hover:bg-white/20">
                  <Typography.Title heading={6}>GET</Typography.Title>
                  <IconChevronDown className="ml-2" />
                </div>
                <div className="ml-4 flex-1">
                  <Form.Input noLabel size="large" placeholder="https://********" />
                </div>

              </div>
              <div className="border rounded-[20px] mt-5 p-5">
                <Tabs className="w-full" style={{ '--semi-color-primary': 'var(--color-primary-2)' }}>
                  <Tabs.TabPane tab="Body" itemKey="Body">
                    <UrlHeaderInputs />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Auth" itemKey="Auth">
                    <UrlHeaderInputs />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Params" itemKey="Params">
                    <UrlHeaderInputs />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Header" itemKey="Header">
                    <UrlHeaderInputs />
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </DeployWrap>

            <Typography.Title heading={2}>
              DEFINE DATA ENDPOINTS
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
              <Button className="!border round !text-white" size="large">PUBLIC</Button>
              <Button className="!border round !text-white ml-5" size="large">PRIVATE</Button>
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
              <Button className="bg-primary-linear !text-white rounded-full w-[160px]" size="large">DEPLOY</Button>
            </div>
          </div>
        </Form>
      </div>

    </BaseLayout>
  );
}
export default Deploy;
