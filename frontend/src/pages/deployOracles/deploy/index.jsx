import {
  Button, Collapsible, Form, Notification, Tabs, Typography,
} from '@douyinfe/semi-ui';
import { IconChevronDown } from '@douyinfe/semi-icons';
import { useState, useRef } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import BaseLayout from '@/components/layout/BaseLayout';
import { DeployWrap } from '../styled';
import UrlHeaderInputs from '../components/UrlHeaderInputs';
import { REQUEST_METHODS } from '@/config/request';
import { submitV2, testrun } from '@/api/deploy';
import { checkHttpUrl } from '@/utils/check';
import LoadingButton from '@/components/custom/LoadingButton';
import ApiResultWrap from '../components/ApiResultWrap';
import { usePolkadotWallet } from '@/hooks/wallet';
import { EVMNETWORKS, POLKADOT_NETWORK_NODES } from '@/config/network';
import { ArrayToObjectByKeyValue, typeTransferToSaaS3Type } from '@/utils/utils';

function Deploy() {
  const nav = useNavigate();
  const formRef = useRef();
  const apiResultRef = useRef();
  const { selectedTargetChain } = usePolkadotWallet();
  const [isParamsBoxOpen, setIsParamsBoxOpen] = useState(false);
  const [testData, setTestData] = useState({});
  const [fetching, setFetching] = useState(false);
  const [visiblity, setVisiblity] = useState('public');
  const [deploying, setDeploying] = useState(false);

  const onFileDrap = (event) => {
    event.preventDefault();
    const [_file] = event.dataTransfer.files;
    formRef.current.formApi.setValue('createrAvatar', [_file]);
  };

  const onTestRun = async () => {
    try {
      const {
        url = '', oracleInfo: { web2Info },
      } = formRef.current.formApi.getValues();
      const {
        method, headers, body,
      } = web2Info;
      if (checkHttpUrl(url)) {
        setFetching(true);
        const testResult = await testrun({
          uri: url,
          method: method.toUpperCase(),
          headers: headers.reduce((ret, curr) => {
            const { key = '', value = '' } = curr || {};
            if (!key && !value) {
              return ret;
            }
            ret[key] = value;
            return ret;
          }, {}),
          body: body.reduce((ret, curr) => {
            const { key = '', value = '' } = curr || {};
            if (!key && !value) {
              return ret;
            }
            ret[key] = value;
            return ret;
          }, {}),
        });
        setTestData(testResult);
      }
    } catch (error) {

    }
    setFetching(false);
  };

  const onChangeUrl = (href = '') => {
    try {
      if (!href || !href.includes('?')) {
        formRef.current.formApi.setValue('oracleInfo.web2Info.params', [{}]);
        return;
      }
      const paramArr = href.slice(href.indexOf('?') + 1).split('&').map((str = '') => {
        const [key, ...value] = str.split('=');
        return { key, value: value.join('=') };
      });
      paramArr.push({});
      formRef.current.formApi.setValue('oracleInfo.web2Info.params', paramArr);
    } catch (error) {

    }
  };

  const onChangeParams = () => {
    setTimeout(() => {
      const url = formRef.current.formApi.getValue('url') || '';
      const origin = url.slice(0, url.indexOf('?'));
      let res = '?';
      const _params = [...(formRef.current.formApi.getValues()?.params || [])];
      for (const param of _params) {
        const { key = '', value = '' } = param || {};
        if (!key && !value) {
          // eslint-disable-next-line no-continue
          continue;
        }
        res += `${key}=${value}&`;
      }
      formRef.current.formApi.setValue('url', origin + res);
    });
  };

  const onSubmit = async (values) => {
    const {
      evmChainId, oracleInfo, creatorInfo, logo,
    } = values;
    const { path: _path, value } = apiResultRef.current;
    if (!_path?.length) {
      Notification.error({
        title: 'error',
        content: 'Define data source and test run to be able to define end points.',
      });
      return;
    }
    const currEvmNetwork = EVMNETWORKS[evmChainId];
    const _type = typeTransferToSaaS3Type(value);
    const params = {
      ...ArrayToObjectByKeyValue(oracleInfo.web2Info.params),
      _type,
      _path: _path.reverse().join('.'),
    };
    const body = ArrayToObjectByKeyValue(oracleInfo.web2Info.body);
    const headers = ArrayToObjectByKeyValue(oracleInfo.web2Info.headers);
    const sourceChain = {
      type: 1,
      name: selectedTargetChain.name,
      wsProvider: selectedTargetChain.endpoint,
    };

    const targetChain = {
      type: 0,
      name: currEvmNetwork.chain.name,
      httpProvider: currEvmNetwork.chain.rpcUrls.default,
      id: evmChainId,
    };
    const data = {
      oracleInfo: {
        ...oracleInfo,
        sourceChain,
        targetChain,
        web2Info: {
          ...oracleInfo.web2Info,
          params,
          body,
          headers,
        },
      },
      createorInfo: {
        ...creatorInfo,
      },
      visibility: visiblity === 'public' ? 0 : 1,
      // logo_url: await fileToBase64(logo[0].fileInstance),
    };
    console.log(data, 'data');
    try {
      setDeploying(true);
      const result = await submitV2(data);
      if (result.code === 200) {
        Notification.success({
          title: 'Deployment',
          content: 'Deployment successfully',
        });
        setTimeout(() => {
          nav(-1);
        }, 2000);
        return;
      }
      Notification.error({
        title: 'Deployment',
        content: result?.msg || 'Deployment failed',
      });
    } catch (error) {
      Notification.error({
        title: 'Deployment',
        content: error?.msg || 'Deployment failed',
      });
    }
    setDeploying(false);
  };

  return (
    <BaseLayout>
      <div className="container pt-5 pb-10">
        <Form ref={formRef} onSubmit={onSubmit}>
          <div className="max-w-wrap mx-auto">
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
                    className="cursor-pointer transition-transform hover:bg-white/30 p-1 rounded-sm"
                    style={{
                      transform: `rotate(${isParamsBoxOpen ? '180deg' : '0deg'})`,
                    }}
                    onClick={() => setIsParamsBoxOpen(!isParamsBoxOpen)}
                  />
                </div>
                <div className="flex items-center mt-3">
                  <Form.Select field="oracleInfo.web2Info.method" noLabel className="round" size="large" initValue="GET">
                    {REQUEST_METHODS.map((method) => <Form.Select.Option value={method} key={method}>{method}</Form.Select.Option>)}
                  </Form.Select>
                  <div className="ml-4 flex-1">
                    <Form.Input
                      field="url"
                      rules={[
                        { required: true, message: 'Required error' },
                        { pattern: /^https?:\/\/.+/, message: 'Url matching error' },
                      ]}
                      noLabel
                      size="large"
                      placeholder="https://********"
                      onChange={onChangeUrl}
                      showClear
                    />
                  </div>

                </div>
                <Collapsible
                  isOpen={isParamsBoxOpen}
                  keepDOM
                >
                  <div className="rounded-[20px] p-5 overflow-hidden">
                    <Tabs className="w-full" style={{ '--semi-color-primary': 'var(--color-primary-2)' }}>
                      <Tabs.TabPane tab="Body" itemKey="Body">
                        <UrlHeaderInputs field="oracleInfo.web2Info.body" />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Params" itemKey="Params">
                        <UrlHeaderInputs field="oracleInfo.web2Info.params" onChangeKey={onChangeParams} onChangeValue={onChangeParams} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Headers" itemKey="Headers">
                        <UrlHeaderInputs field="oracleInfo.web2Info.headers" />
                      </Tabs.TabPane>
                    </Tabs>
                  </div>
                </Collapsible>
              </DeployWrap>
              <div className="text-right mt-4">
                <LoadingButton
                  onClick={onTestRun}
                  theme="borderless"
                  className="rounded-full w-[160px] bg-primary-linear !text-white hover:opacity-80"
                  size="large"
                >
                  Test Run
                </LoadingButton>
              </div>
            </div>

            <ApiResultWrap ref={apiResultRef} fetching={fetching} testData={testData} />

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
                  field="oracleInfo.title"
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
                  field="oracleInfo.description"
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
                  field="oracleInfo.web2Info.title"
                  size="large"
                  noLabel
                  placeholder="API 1 TITLE"
                  showClear
                />
              </div>
            </DeployWrap>

            <Typography.Title heading={2}>
              UPLOAD IMAGE
            </Typography.Title>
            <DeployWrap className="text-center" onDragOver={(event) => event.preventDefault()} onDrop={onFileDrap}>
              <Form.Upload
                className="justify-center"
                field="logo"
                noLabel
                limit={1}
                rules={[
                  { required: true, message: 'Required error' },
                ]}
                action=""
                accept="image/*"
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
                field="creatorInfo.notes"
                noLabel
                placeholder="CREATOR’S NOTE"
                showClear
              />
            </DeployWrap>

            <Typography.Title heading={2}>
              SOURCE NETWORK
            </Typography.Title>
            <DeployWrap onDragOver={(event) => event.preventDefault()} onDrop={onFileDrap}>
              <Form.Select
                field="evmChainId"
                className="rounded-full"
                size="large"
                initValue={POLKADOT_NETWORK_NODES[0].id}
                noLabel
                placeholder="CREATOR’S NOTE"
              >
                {
                  POLKADOT_NETWORK_NODES.map((network) => <Form.Select.Option value={network.id}>{network.name}</Form.Select.Option>)
                }
              </Form.Select>
            </DeployWrap>

            <div className="text-center">
              <Button loading={deploying} htmlType="submit" className="bg-primary-linear !text-white rounded-full w-[160px]" size="large">DEPLOY</Button>
            </div>
          </div>
        </Form>
      </div>

    </BaseLayout>
  );
}
export default Deploy;
