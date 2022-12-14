import { Modal } from '@douyinfe/semi-ui';
import {
  useEffect, useImperativeHandle, useState, forwardRef,
} from 'react';

function RefSemiModal(props, ref) {
  const [visibleSelf, setVisibleSelf] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisibleSelf(true),
    close: () => setVisibleSelf(false),
    visible: visibleSelf,
  }), [visibleSelf, setVisibleSelf]);

  useEffect(() => {
    setVisibleSelf(Boolean(props.visible));
  }, [props.visible]);

  return (
    <Modal
      {...props}
      visible={visibleSelf}
      onCancel={() => {
        setVisibleSelf(false);
        props?.onCancel && props.onCancel();
      }}
    />
  );
}

export default forwardRef(RefSemiModal);
