import {
  Button, Form, Tabs, Typography,
} from '@douyinfe/semi-ui';
import { IconChevronUp, IconChevronDown } from '@douyinfe/semi-icons';
import { useState, useRef } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import BaseLayout from '@/components/layout/BaseLayout';
import { DeployWrap } from '../styled';
import { deploy } from '@/contracts/deploy';
import { readFileContent } from '@/utils/file';
import { usePolkadotWallet } from '@/hooks/wallet';
import UrlHeaderInputs from '../components/UrlHeaderInputs';
import { REQUEST_METHODS } from '@/config/request';
import { toggleCollapsible } from '@/utils/animation';

function Deploy() {
  const formRef = useRef();
  const boxRef = useRef();
  const { account } = usePolkadotWallet();
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [visiblity, setVisiblity] = useState('public');
  const [file, setFile] = useState();
  const onFileChange = (files) => {
    const [_file] = files;
    setFile(_file);
  };

  const onFileDrap = (event) => {
    event.preventDefault();
    const [_file] = event.dataTransfer.files;
    formRef.current.formApi.setValue('createrAvatar', [_file]);
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
  const onTestRun = async () => {
    const { url, method } = formRef.current.formApi.getValues();
    const apiResult = await axios({
      url,
      method,
    });
    console.log(apiResult);
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <BaseLayout>
      <div className="container pt-5 pb-10">
        <Form ref={formRef} onSubmit={onSubmit}>
          <div className="max-w-wrap mx-auto">
            <Typography.Title heading={2}>
              CONTRACT INFORMATION
            </Typography.Title>
            <DeployWrap>
              <Form.Upload
                rules={[
                  { required: true, message: 'Required error' },
                ]}
                field="contractFile"
                noLabel
                limit={1}
                action=""
                uploadTrigger="custom"
                onFileChange={onFileChange}
              >
                <Button theme="borderless" style={{ marginRight: 8 }}>
                  Choose contract file
                </Button>
              </Form.Upload>
              <div className="mt-5">
                <Typography.Title heading={5}>
                  CLUSTER ID
                </Typography.Title>

                <Form.Input
                  size="large"
                  field="clusterId"
                  noLabel
                  placeholder="0x0000000000000000000000000000000000000000000000000000000000000000"
                />
              </div>

            </DeployWrap>

            <div className="mb-[52px]">
              <Typography.Title heading={2}>
                DEFINE DATA SOURCE
              </Typography.Title>
              <DeployWrap className="!pt-0 !mb-0">
                <div className="header">
                  <Typography.Title heading={4}>
                    API 1
                  </Typography.Title>
                  <IconChevronDown
                    className="hover transition-transform"
                    style={{
                      transform: `rotate(${isUnfolded ? '180deg' : '0deg'})`,
                    }}
                    onClick={() => {
                      setIsUnfolded(!isUnfolded);
                      toggleCollapsible(boxRef.current);
                    }}
                  />
                </div>
                <div className="flex items-center mt-3">
                  <Form.Select field="method" noLabel className="round" size="large" initValue="GET">
                    {REQUEST_METHODS.map((method) => <Form.Select.Option value={method} key={method}>{method}</Form.Select.Option>)}
                  </Form.Select>
                  <div className="ml-4 flex-1">
                    <Form.Input
                      initValue="https://baidu.com"
                      field="url"
                      rules={[
                        { required: true, message: 'Required error' },
                        { pattern: /^https?:\/\/.+/, message: 'Url matching error' },
                      ]}
                      noLabel
                      size="large"
                      placeholder="https://********"
                      showClear
                    />
                  </div>

                </div>
                <div
                  className="rounded-[20px] p-5 overflow-hidden"
                  style={{
                    transition: 'height 300ms',
                  }}
                  ref={boxRef}
                >
                  <Tabs className="w-full" style={{ '--semi-color-primary': 'var(--color-primary-2)' }}>
                    <Tabs.TabPane tab="Body" itemKey="Body">
                      <UrlHeaderInputs field="body" />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Auth" itemKey="Auth">
                      <UrlHeaderInputs field="auth" />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Params" itemKey="Params">
                      <UrlHeaderInputs field="params" />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Header" itemKey="Header">
                      <UrlHeaderInputs field="header" />
                    </Tabs.TabPane>
                  </Tabs>
                </div>
              </DeployWrap>
              <div className="text-right mt-4">
                <Button
                  onClick={onTestRun}
                  theme="borderless"
                  className="rounded-full w-[160px] bg-primary-linear !text-white hover:opacity-80"
                  size="large"
                >
                  Test Run
                </Button>
              </div>
            </div>

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
              <Button
                className={classNames('round !text-white', {
                  '!border-white': visiblity === 'public',
                })}
                size="large"
                onClick={() => setVisiblity('public')}
              >
                PUBLIC
              </Button>
              <Button
                className={classNames('round !text-white ml-5', {
                  '!border-white': visiblity === 'private',
                })}
                size="large"
                onClick={() => setVisiblity('private')}
              >
                PRIVATE
              </Button>
            </DeployWrap>

            <Typography.Title heading={2}>
              INFORMATION
            </Typography.Title>
            <DeployWrap>
              <div>
                <Typography.Title heading={5}>ORACLE TITLE</Typography.Title>
                <Form.Input
                  field="oracleTitle"
                  rules={[
                    { required: true, message: 'Required error' },
                  ]}
                  size="large"
                  noLabel
                  placeholder="ORACALE TITLE"
                  showClear
                />
              </div>
              <div className="mt-5">
                <Typography.Title heading={5}>ORACLE DESCRIPTION</Typography.Title>
                <Form.TextArea
                  rules={[
                    { required: true, message: 'Required error' },
                  ]}
                  showClear
                  className="rounded-xl"
                  field="oracleDescription"
                  size="large"
                  noLabel
                  placeholder="ORACALE DESCRIPTION"
                />
              </div>
              <div className="mt-5">
                <Typography.Title heading={5}>API 1 TITLE</Typography.Title>
                <Form.Input
                  rules={[
                    { required: true, message: 'Required error' },
                  ]}
                  field="api1Title"
                  size="large"
                  noLabel
                  placeholder="API 1 TITLE"
                  showClear
                />
              </div>
            </DeployWrap>

            <Typography.Title heading={2}>
              CREATOR’S NOTE
            </Typography.Title>
            <DeployWrap className="text-center" onDragOver={(event) => event.preventDefault()} onDrop={onFileDrap}>
              <Form.Upload
                className="justify-center"
                field="createrAvatar"
                noLabel
                limit={1}
                action=""
                uploadTrigger="custom"
                listType="picture"
              >
                upload
              </Form.Upload>
              <Typography.Title heading={6} className="text-[#5B5B5D]">Drop file here or <span className="text-primary-2 underline">Choose File</span></Typography.Title>
            </DeployWrap>

            <Typography.Title heading={2}>
              CREATOR’S NOTE
            </Typography.Title>
            <DeployWrap className="text-center" onDragOver={(event) => event.preventDefault()} onDrop={onFileDrap}>
              <Form.TextArea
                rules={[
                  { required: true, message: 'Required error' },
                ]}
                field="createrNote"
                noLabel
                placeholder="CREATOR’S NOTE"
                showClear
              />
            </DeployWrap>

            <Typography.Title heading={2}>
              NETWORK
            </Typography.Title>
            <DeployWrap onDragOver={(event) => event.preventDefault()} onDrop={onFileDrap}>
              <Form.Select
                field="network"
                className=" rounded-full"
                size="large"
                label="network"
                initValue="ETHEREUM"
                noLabel
                placeholder="CREATOR’S NOTE"
              >
                <Form.Select.Option value="ETHEREUM">ETHEREUM</Form.Select.Option>
              </Form.Select>
            </DeployWrap>

            <div className="text-center">
              <Button htmlType="submit" className="bg-primary-linear !text-white rounded-full w-[160px]" size="large">DEPLOY</Button>
            </div>
          </div>
        </Form>
      </div>

    </BaseLayout>
  );
}
export default Deploy;
