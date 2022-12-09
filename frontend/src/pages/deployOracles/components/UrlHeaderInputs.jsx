import { useRef, useState } from 'react';
import { Form } from '@douyinfe/semi-ui';

function UrlHeaderInputs() {
  const formRef = useRef();
  const [inputs, setInputs] = useState([{}]);

  const onFocus = (i) => {
    if (!inputs[i + 1]) {
      inputs.push({});
      setInputs([...inputs]);
    }
  };

  return (
    <div>
      <Form ref={formRef}>
        {inputs.map((_, i) => (
          <div className="flex items-center">
            <div className="flex-1 mr-2">
              <Form.Input placeholder="Key" onFocus={() => onFocus(i)} noLabel />
            </div>
            <div className="flex-1">
              <Form.Input placeholder="Value" onFocus={() => onFocus(i)} noLabel />
            </div>
          </div>
        ))}
      </Form>
    </div>
  );
}

export default UrlHeaderInputs;
