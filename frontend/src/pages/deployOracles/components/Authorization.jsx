import React, { useCallback, useMemo, useState } from 'react';
import { Form } from '@douyinfe/semi-ui';
import classNames from 'classnames';

export default function Authorization() {
  const [authType, setAuthType] = useState('NoAuth');
  const optionList = useMemo(
    () => [
      {
        value: 'NoAuth',
        label: 'NoAuth',
      },
      {
        label: 'ApiKeyInUrl',
        value: 'ApiKeyInUrl',
      },
      {
        label: 'ApiKeyInHeader',
        value: 'ApiKeyInHeader',
      },
      {
        label: 'Bearer Token',
        value: 'BearerToken',
      },
    ],
    [],
  );
  const onChange = (val) => {
    setAuthType(val);
  };

  const getHiddenClass = (_types) => (!_types.includes(authType) ? 'hidden' : '');

  const RenderBearerToken = useMemo(() => (
    <div className={classNames('flex items-center', getHiddenClass(['BearerToken']))}>
      <span className="mr-2">Bearer </span>
      <div className="flex-1">
        <Form.Input
          field="oracleInfo.web2Info.auth.BearerToken.value"
          placeholder="Bearer Token"
          noLabel
        />
      </div>
    </div>
  ), [authType]);

  const RenderInputKeyValue = useCallback((field, className) => (
    <div className={classNames('flex items-center', className)}>
      <div className="mr-2 flex-1">
        <Form.Input
          field={`oracleInfo.web2Info.auth.${field}.key`}
          placeholder="Key"
          noLabel
        />
      </div>
      <div className="flex-1">
        <Form.Input
          field={`oracleInfo.web2Info.auth.${field}.value`}
          placeholder="Value"
          noLabel
        />
      </div>
    </div>
  ), [authType]);

  const RenderAuthContext = useMemo(() => (
    <>
      {RenderInputKeyValue('apiKey', getHiddenClass(['ApiKeyInUrl', 'ApiKeyInHeader']))}
      {RenderBearerToken}
    </>
  ), [authType, RenderBearerToken]);

  return (
    <div className="flex items-center">
      <Form.Select
        field="oracleInfo.web2Info.auth.type"
        className="rounded-[12px]"
        initValue={authType}
        placeholder="Key"
        noLabel
        optionList={optionList}
        onChange={onChange}
      />
      <div className={classNames('ml-2 flex-1', {
        hidden: !authType,
      })}
      >
        {RenderAuthContext}
      </div>
    </div>
  );
}
