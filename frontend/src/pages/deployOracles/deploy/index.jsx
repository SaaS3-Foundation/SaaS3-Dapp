import {
  Button, Collapsible, Form, Notification, Tabs, Toast, Typography,
} from '@douyinfe/semi-ui';
import { IconChevronDown } from '@douyinfe/semi-icons';
import { useState, useRef } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { useNetwork } from 'wagmi';
import { ethers } from 'ethers';
import BaseLayout from '@/components/layout/BaseLayout';
import { DeployWrap } from '../styled';
import UrlHeaderInputs from '../components/UrlHeaderInputs';
import { REQUEST_METHODS } from '@/config/config';
import { submitV2, testrun } from '@/api/deploy';
import { checkHttpUrl } from '@/utils/check';
import LoadingButton from '@/components/custom/LoadingButton';
import ApiResultWrap from '../components/ApiResultWrap';
import { POLKADOT_NETWORK_NODES } from '@/config/network';
import { ArrayToObjectByKeyValue, filterEmptyField, typeTransferToSaaS3Type } from '@/utils/utils';
import { useUserInfo } from '@/hooks/provider';
import Authorization from '../components/Authorization';

const AuthType = {
  NoAuth: 0,
  ApiKey: 1,
  BearerToken: 2,
};

const getAuthType = (type = '') => {
  if (type.toLowerCase().includes('apikey')) {
    return AuthType.ApiKey;
  }
  return AuthType[type];
};

const getFixedParamsObject = (arr = []) => arr.reduce((ret, curr) => {
  if (!curr) return ret;
  const { fixed, key } = curr;
  if (fixed) {
    ret[key] = true;
  }
  return ret;
}, {});

function Deploy() {
  const nav = useNavigate();
  const formRef = useRef();
  const apiResultRef = useRef();
  const uploadRef = useRef();
  const [isParamsBoxOpen, setIsParamsBoxOpen] = useState(false);
  const [testData, setTestData] = useState({});
  const [fetching, setFetching] = useState(false);
  const [visiblity, setVisiblity] = useState('public');
  const [deploying, setDeploying] = useState(false);
  const { chain } = useNetwork();
  const { userInfo } = useUserInfo();

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
          headers: filterEmptyField(headers),
          body: filterEmptyField(body),
        });
        setTestData(testResult);
      }
    } catch (error) {
      setTestData({
        code: 500,
        msg: error.message || 'Network Error',
      });
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
      const _params = [...(formRef.current.formApi.getValue('oracleInfo.web2Info.params') || [])];
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
      sourceChainId, oracleInfo, creatorNote, logo, url,
    } = values;

    const { path: _path, value } = apiResultRef.current;
    if (!_path?.length) {
      formRef.current.formApi.scrollToField('url');
      Notification.error({
        title: 'error',
        content: 'Define data source and test run to be able to define end points.',
      });
      return;
    }

    const {
      params, bodyRaw, headers, auth,
    } = oracleInfo.web2Info;
    let body = {};
    try {
      if (bodyRaw) {
        body = JSON.parse(bodyRaw);
      }
    } catch (error) {
      return Toast.error('Body Raw illegal.');
    }

    const _type = typeTransferToSaaS3Type(value);
    const apiInfo = {
      params: {
        ...ArrayToObjectByKeyValue(params),
        _type,
        _path: _path.reverse().join('.'),
      },
      body,
      // body: ArrayToObjectByKeyValue(body),
      headers: ArrayToObjectByKeyValue(headers),
    };

    setAuth(apiInfo, auth);
    delete oracleInfo.web2Info.auth;

    const data = {
      oracleInfo: {
        ...oracleInfo,
        sourceChain: { chainId: sourceChainId },
        targetChain: { chainId: chain.id },
        web2Info: {
          ...oracleInfo.web2Info,
          ...apiInfo,
          fixedParams: getFixedParamsObject(oracleInfo.web2Info.params),
          fixedHeaders: getFixedParamsObject(oracleInfo.web2Info.headers),
          uri: url.split('?')[0],
          authType: getAuthType(auth.type),
        },
      },
      creatorNote,
      visibility: visiblity === 'public' ? 0 : 1,
      // logo_url: await fileToBase64(logo[0].fileInstance),
    };

    try {
      setDeploying(true);
      const result = await submitV2(userInfo.id, data);
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
      throw result;
    } catch (error) {
      Notification.error({
        title: 'Deployment',
        content: error?.msg || 'Deployment failed',
      });
    }
    setDeploying(false);
  };

  const setAuth = (apiInfo, auth = {}) => {
    const { type, apiKey, BearerToken } = auth;
    if (!type) return;
    const apikey_Key = '__saas3_apikey_';
    const _key = !apiKey?.key ? null : `${apikey_Key}${apiKey.key}`;
    if (type === 'ApiKeyInUrl' && _key) {
      apiInfo.params[apiKey.key] = apiKey.value;
    } else if (type === 'ApiKeyInHeader' && _key) {
      apiInfo.headers[_key] = apiKey.value;
    } else if (type === 'BearerToken' && BearerToken?.value) {
      const token = BearerToken.value.replace(/^Bearer\s/, '');
      apiInfo.headers.Authorization = `Bearer ${token}`;
    }
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
                        {/* <UrlHeaderInputs field="oracleInfo.web2Info.body" /> */}
                        <Form.TextArea
                          field="oracleInfo.web2Info.bodyRaw"
                          noLabel
                          showClear
                          className="rounded-xl"
                          size="large"
                          placeholder="BODY RAW"
                        />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Params" itemKey="Params">
                        <UrlHeaderInputs
                          isLock
                          field="oracleInfo.web2Info.params"
                          onChangeKey={onChangeParams}
                          onChangeValue={onChangeParams}
                          onLockChange={(key, state) => formRef.current.formApi.setValue(key, state)}
                        />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Headers" itemKey="Headers">
                        <UrlHeaderInputs
                          isLock
                          field="oracleInfo.web2Info.headers"
                          onLockChange={(key, state) => formRef.current.formApi.setValue(key, state)}
                        />

                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Authorization" itemKey="Authorization">
                        <Authorization />
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
            <DeployWrap className="text-center">
              <Form.Upload
                ref={uploadRef}
                className="justify-center"
                field="logo"
                noLabel
                limit={1}
                action=""
                accept="image/*"
                uploadTrigger="custom"
                listType="picture"
                draggable
              >
                upload
              </Form.Upload>
              <Typography.Title heading={6} className="text-[#5B5B5D]">
                Drop file here or
                &nbsp;<span onClick={() => uploadRef.current.onClick()} className="text-primary-2 underline cursor-pointer">Choose File</span>
              </Typography.Title>
            </DeployWrap>

            <Typography.Title heading={2}>
              CREATOR’S NOTE
            </Typography.Title>
            <DeployWrap className="text-center">
              <Form.TextArea
                rules={[
                  { required: true, message: 'Required error' },
                ]}
                field="creatorNote"
                noLabel
                placeholder="CREATOR’S NOTE"
                showClear
              />
            </DeployWrap>

            <Typography.Title heading={2}>
              SOURCE NETWORK
            </Typography.Title>
            <DeployWrap>
              <Form.Select
                field="sourceChainId"
                className="rounded-full"
                size="large"
                initValue={POLKADOT_NETWORK_NODES[0].id}
                noLabel
              >
                {
                  POLKADOT_NETWORK_NODES.map((network) => (
                    <Form.Select.Option
                      value={network.id}
                      key={network.id}
                    >
                      {network.name}
                    </Form.Select.Option>
                  ))
                }
              </Form.Select>
            </DeployWrap>

            <Typography.Title heading={2}>
              TARGET NETWORK
            </Typography.Title>
            <DeployWrap>
              <div>
                <Typography.Title heading={5}>
                  Submitter Address
                </Typography.Title>
                <Form.Input
                  rules={[
                    {
                      validator: (_, value, callback) => {
                        if (!value) {
                          return callback(new Error('Required error.'));
                        }
                        if (!ethers.utils.isAddress(value)) {
                          return callback(new Error('Illegal address.'));
                        }
                        return callback();
                      },
                    },
                  ]}
                  field="oracleInfo.wallet"
                  size="large"
                  noLabel
                  placeholder="Submitter Address"
                  showClear
                />
              </div>
              <div className="mt-4">
                <Typography.Title heading={5}>
                  Submitter PrivateKey
                </Typography.Title>
                <Form.Input
                  rules={[
                    {
                      validator: (_, value, callback) => {
                        if (!value) {
                          return callback(new Error('Required error.'));
                        }
                        try {
                        // eslint-disable-next-line no-new
                          new ethers.Wallet(value);
                          return callback();
                        } catch (error) {
                          return callback(new Error('Illegal private key.'));
                        }
                      },
                    },
                  ]}
                  field="oracleInfo.privateKey"
                  size="large"
                  noLabel
                  placeholder="Submitter PrivateKey"
                  showClear
                />
              </div>
            </DeployWrap>

            <div className="text-center">
              <Button
                loading={deploying}
                htmlType="submit"
                className="bg-primary-linear !text-white rounded-full w-[160px]"
                size="large"
              >
                DEPLOY
              </Button>
            </div>
          </div>
        </Form>
      </div>

    </BaseLayout>
  );
}
export default Deploy;
