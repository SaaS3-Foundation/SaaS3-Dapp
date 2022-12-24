import { useMemo, useState } from 'react';
import { Form } from '@douyinfe/semi-ui';
import classNames from 'classnames';
import { ReactComponent as Sight } from '@/assets/imgs/svg/sight.svg?keepFill';
import { ReactComponent as DisSight } from '@/assets/imgs/svg/disSight.svg?keepFill';

function PrivacyField(props) {
  const {
    value, editing, placeholder, className, label,
  } = props;

  const [visible, setVisible] = useState(false);

  const hanldeClickIcon = () => {
    setVisible(!visible);
  };

  const Icon = useMemo(() => {
    const Com = visible ? Sight : DisSight;
    return <Com className="hover:fill-gray-300" fill="white" />;
  }, [visible]);

  return (
    <div className={classNames('flex', className)}>
      <div className="pt-1 cursor-pointer" onClick={hanldeClickIcon}>
        { Icon }
      </div>
      <div className="flex flex-col ml-1 w-max">
        <div>{label}</div>
        {!editing
          ? <div>{visible ? value || '--' : '******'}</div>
          : <Form.Input noLabel value={value} placeholder={placeholder || label} size="small" />}
      </div>
    </div>
  );
}
export default PrivacyField;
