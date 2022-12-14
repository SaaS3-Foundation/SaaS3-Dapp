import { Layout } from '@douyinfe/semi-ui';
import classNames from 'classnames';
import styled from 'styled-components';
import Header from '../Header';
import bgVideo from '@/assets/videos/bg-video.mp4';

const StyledBgVideoWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  >video{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function BaseLayout(props) {
  const { children, className, contentClassName } = props;
  return (
    <Layout className={classNames('h-screen', className)}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content className={classNames('bg-black/10 relative', contentClassName)}>
        {children}
      </Layout.Content>
      <StyledBgVideoWrap>
        <video
          autoPlay
          muted
          loop
          src={bgVideo}
        />
      </StyledBgVideoWrap>
    </Layout>
  );
}

export default BaseLayout;
