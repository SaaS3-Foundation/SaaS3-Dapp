import { ArrayField, Form } from '@douyinfe/semi-ui';
import { useState } from 'react';
import Lock from '@/components/comm/icon/Lock';

function LockField(props) {
  const { onClick } = props;
  const [isLock, setIsLock] = useState(false);
  const handleClick = () => {
    const nextLock = !isLock;
    setIsLock(nextLock);
    onClick && onClick(nextLock);
  };
  return (
    <div className="mr-2" onClick={handleClick}>
      <Lock lock={isLock} />
    </div>
  );
}

function UrlHeaderInputs(props) {
  const {
    field: arrayFieldName, onChangeKey, onChangeValue, isLock, onLockChange,
  } = props;

  const onFocus = (arr, i, addFn) => {
    if (!arr[i + 1]) {
      addFn();
    }
  };

  return (
    <div>
      <ArrayField field={arrayFieldName} initValue={[{}]}>
        {({ add, arrayFields }) => (
          <>
            {
              arrayFields.map(({ field, key }, i) => (
                <div className="flex items-center" key={key}>
                  {
                    isLock && (
                      <LockField
                        onClick={(state) => onLockChange && onLockChange(`${field}.fixed`, state)}
                      />
                    )
                  }
                  <div className="flex-1 mr-2">
                    <Form.Input
                      field={`${field}[key]`}
                      placeholder="Key"
                      onInput={() => onFocus(arrayFields, i, add)}
                      onChange={() => onChangeKey && onChangeKey(arrayFields)}
                      noLabel
                    />
                  </div>
                  <div className="flex-1">
                    <Form.Input
                      field={`${field}[value]`}
                      placeholder="Value"
                      // onFocus={() => onFocus(arrayFields, i, add)}
                      onInput={() => onFocus(arrayFields, i, add)}
                      onChange={() => onChangeValue && onChangeValue(arrayFields)}
                      noLabel
                    />
                  </div>
                </div>
              ))
            }
          </>
        )}
      </ArrayField>
    </div>
  );
}

export default UrlHeaderInputs;
