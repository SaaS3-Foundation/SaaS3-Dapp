import { Layout } from '@douyinfe/semi-ui';
import classNames from 'classnames';
import Header from '../header';

function BaseLayout(props) {
  const { children, className, contentClassName } = props;
  return (
    <Layout className={classNames('h-screen', className)}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content className={classNames('bg-dark-1', contentClassName)}>
        {children}
      </Layout.Content>
    </Layout>
  );
}

export default BaseLayout;
