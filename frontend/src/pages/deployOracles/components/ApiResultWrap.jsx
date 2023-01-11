import { IconChevronDown } from '@douyinfe/semi-icons';
import { Collapsible, Spin, Typography } from '@douyinfe/semi-ui';
import {
  forwardRef, useState, useImperativeHandle, useCallback,
} from 'react';
import JsonTree from '@/components/comm/JsonTree';
import { DeployWrap, StyledJsonTreeWrap } from '../styled';
import LeadJsonSelect from './LeadJsonSelect';

function ApiResultWrap(props, ref) {
  const { fetching, testData } = props;
  const [isJSONBoxOpen, setIsJSONBoxOpen] = useState(true);
  const [endpointPath, setEndpointPath] = useState([]);
  const [endpointValueASString, setEndpointValueASString] = useState('--');
  const [endpointValue, setEndpointValue] = useState('--');
  const [showDemo, setShowDemo] = useState(true);

  useImperativeHandle(ref, () => ({
    path: endpointPath,
    valueASString: endpointValueASString,
    value: endpointValue,
  }), [endpointPath, endpointValue]);

  const renderHeader = useCallback(() => {
    if (fetching) {
      return <Spin size="large" />;
    }
    if (testData?.code === 500) {
      return <Typography.Text type="danger">{testData?.msg}</Typography.Text>;
    }
    return (
      <>
        <Typography.Text className="border round py-2 px-3 font-bold">DATA ENDPOINT PATH:  {[...endpointPath].reverse().join('.') || '--'}</Typography.Text>
        {/* <Typography.Text className="border round py-2 px-3 font-bold">DATA ENDPOINT:  {endpointValueASString}</Typography.Text> */}
      </>
    );
  }, [endpointPath, endpointValue, fetching, testData]);

  const renderJsonContent = useCallback(() => (showDemo
    ? <LeadJsonSelect onClick={() => setShowDemo(false)} /> : (
      <Collapsible isOpen={isJSONBoxOpen} keepDOM>
        <StyledJsonTreeWrap>
          <JsonTree
            data={testData.data}
            selectKeyPath={endpointPath}
            onClickValue={(keyPath, valueAsString, value) => {
              setEndpointPath(keyPath);
              setEndpointValueASString(valueAsString);
              setEndpointValue(value);
            }}
          />
        </StyledJsonTreeWrap>
      </Collapsible>
    )), [showDemo, isJSONBoxOpen, testData]);

  return (
    <div>
      <Typography.Title heading={2}>
        DEFINE DATA ENDPOINTS
      </Typography.Title>

      <DeployWrap>
        { Object.keys(testData).length === 0 && !fetching
          ? <Typography.Text className="block text-lg !text-center">Define data source and test run to be able to define end points.</Typography.Text>
          : (
            <>
              <div className="header">
                <Typography.Title heading={4} className="flex-shrink-0">
                  API 1
                </Typography.Title>
                <div className="flex items-center flex-wrap gap-2 ml-2">
                  {renderHeader()}
                </div>
                {
                  testData.code === 200 && (
                    <IconChevronDown
                      className="cursor-pointer transition-transform hover:bg-white/30 p-1 rounded-sm"
                      style={{
                        transform: `rotate(${isJSONBoxOpen ? '180deg' : '0deg'})`,
                      }}
                      onClick={() => setIsJSONBoxOpen(!isJSONBoxOpen)}
                    />
                  )
                }
              </div>
              {
                testData.code === 200 ? renderJsonContent() : null
              }
            </>
          ) }

      </DeployWrap>

    </div>
  );
}

export default forwardRef(ApiResultWrap);
