import { ArrayField, Form } from '@douyinfe/semi-ui';

function UrlHeaderInputs(props) {
  const { field: arrayFieldName, onChangeKey, onChangeValue } = props;

  const onFocus = (arr, i, addFn) => {
    if (!arr[i + 1]) {
      addFn();
    }
  };

  return (
    <div>
      <ArrayField field={arrayFieldName} initValue={[{}]}>
        {({ add, arrayFields, addWithInitValue }) => (
          <>
            {
              arrayFields.map(({ field, key }, i) => (
                <div className="flex items-center" key={key}>
                  <div className="flex-1 mr-2">
                    <Form.Input
                      field={`${field}[key]`}
                      placeholder="Key"
                      // onFocus={() => onFocus(arrayFields, i, add)}
                      onInput={() => onFocus(arrayFields, i, add)}
                      onChange={() => onChangeKey(arrayFields)}
                      noLabel
                    />
                  </div>
                  <div className="flex-1">
                    <Form.Input
                      field={`${field}[value]`}
                      placeholder="Value"
                      // onFocus={() => onFocus(arrayFields, i, add)}
                      onInput={() => onFocus(arrayFields, i, add)}
                      onChange={() => onChangeValue(arrayFields)}
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
